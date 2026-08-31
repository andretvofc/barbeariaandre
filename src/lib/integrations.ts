/**
 * ─── INTEGRAÇÕES EXTERNAS ─────────────────────────────────────────────────────
 *
 * Variáveis de ambiente necessárias (.env.local):
 *
 * WhatsApp Business Cloud API:
 *   VITE_WA_ACCESS_TOKEN      — token de acesso permanente da Meta
 *   VITE_WA_PHONE_NUMBER_ID   — ID do número remetente (ex: 123456789012345)
 *   VITE_WA_ADMIN_NUMBER      — número do admin com DDI, sem + (ex: 5567999999999)
 *
 * Google Sheets (via n8n / Make webhook):
 *   VITE_SHEETS_WEBHOOK_URL   — URL do webhook que escreve na planilha
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ⚠️  Em produção real, mova essas chamadas para um servidor (edge function no
 *      Supabase ou qualquer backend Node/Bun) para NUNCA expor o access token
 *      no bundle do cliente.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface AppointmentPayload {
  customerName: string;
  customerPhone: string;
  cpf: string;
  date: string;   /* DD/MM/YYYY */
  time: string;   /* HH:MM */
  service: string;
  createdAt: string; /* ISO */
}

/* ─── WHATSAPP ────────────────────────────────────────────────── */
async function sendWhatsAppText(to: string, text: string) {
  const token = import.meta.env.VITE_WA_ACCESS_TOKEN as string;
  const phoneNumberId = import.meta.env.VITE_WA_PHONE_NUMBER_ID as string;

  if (!token || !phoneNumberId) {
    console.warn("[WA] VITE_WA_ACCESS_TOKEN ou VITE_WA_PHONE_NUMBER_ID não configurados.");
    return;
  }

  await fetch(
    `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      }),
    },
  );
}

export async function notifyAdminWhatsApp(payload: AppointmentPayload) {
  const adminNumber = import.meta.env.VITE_WA_ADMIN_NUMBER as string;
  if (!adminNumber) {
    console.warn("[WA] VITE_WA_ADMIN_NUMBER não configurado.");
    return;
  }
  const text =
    `✂️ *NOVO AGENDAMENTO*\n\n` +
    `Cliente: ${payload.customerName}\n` +
    `Telefone: ${payload.customerPhone}\n` +
    `Data: ${payload.date}\n` +
    `Horário: ${payload.time}\n` +
    `Serviço: ${payload.service}\n\n` +
    `Agendamento confirmado pelo site.`;

  await sendWhatsAppText(adminNumber, text);
}

export async function notifyClientWhatsApp(payload: AppointmentPayload) {
  /* normaliza: remove tudo que não é dígito */
  const phone = payload.customerPhone.replace(/\D/g, "");
  if (!phone) return;

  const text =
    `Olá, ${payload.customerName}! ✂️\n\n` +
    `Seu horário na barbearia foi confirmado.\n\n` +
    `📅 ${payload.date}\n` +
    `⏰ ${payload.time}\n` +
    `✂️ ${payload.service}\n\n` +
    `Esperamos você!`;

  await sendWhatsAppText(phone, text);
}

/* ─── GOOGLE SHEETS (via webhook n8n / Make) ──────────────────── */
export async function syncGoogleSheets(payload: AppointmentPayload) {
  const webhookUrl = import.meta.env.VITE_SHEETS_WEBHOOK_URL as string;

  if (!webhookUrl) {
    console.warn("[Sheets] VITE_SHEETS_WEBHOOK_URL não configurada.");
    return;
  }

  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: payload.date,
      horario: payload.time,
      cliente: payload.customerName,
      cpf: maskCpf(payload.cpf),
      telefone: payload.customerPhone,
      servico: payload.service,
      status: "Confirmado",
      data_agendamento: new Date(payload.createdAt).toLocaleDateString("pt-BR"),
    }),
  });
}

/* ─── HELPERS ─────────────────────────────────────────────────── */
export function maskCpf(cpf: string): string {
  const d = cpf.replace(/\D/g, "");
  return d.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "***.$2.$3-**");
}

export function normalizeCpf(cpf: string): string {
  return cpf.replace(/\D/g, "");
}

export function validateCpf(cpf: string): boolean {
  const d = normalizeCpf(cpf);
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  const calc = (n: number) => {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += parseInt(d[i]) * (n + 1 - i);
    const r = (sum * 10) % 11;
    return r === 10 || r === 11 ? 0 : r;
  };
  return calc(9) === parseInt(d[9]) && calc(10) === parseInt(d[10]);
}

export function formatPhone(phone: string): string {
  const d = phone.replace(/\D/g, "");
  if (d.length === 11)
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10)
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return phone;
}
