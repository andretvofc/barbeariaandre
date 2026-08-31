/**
 * ─── BANCO DE DADOS LOCAL (persistência real no navegador) ───────────────
 *
 * Enquanto o Supabase não estiver configurado (ver src/lib/supabase.ts,
 * VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY), os agendamentos são
 * salvos aqui via localStorage — persistência real, sobrevive a reload.
 *
 * Quando o Supabase estiver configurado, cada confirmação também tenta
 * gravar nas tabelas reais (appointments/booking_holds) em paralelo,
 * então basta configurar as variáveis de ambiente para migrar sem
 * reescrever a página.
 * ───────────────────────────────────────────────────────────────────────
 */

export interface LocalAppointment {
  id: string;
  customer_name: string;
  customer_phone: string;
  service_name: string;
  service_price: string;
  service_duration: string;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // HH:MM
  status: "confirmado" | "cancelado" | "concluido";
  created_at: string; // ISO
}

export interface LocalHold {
  id: string;
  appointment_date: string;
  appointment_time: string;
  expires_at: string; // ISO
}

const APPTS_KEY = "barber_appointments";
const HOLDS_KEY = "barber_holds";

function read<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

function write<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

/* ─── APPOINTMENTS ────────────────────────────────────────────── */
export function getAppointments(): LocalAppointment[] {
  return read<LocalAppointment>(APPTS_KEY).sort((a, b) =>
    `${b.appointment_date}${b.appointment_time}`.localeCompare(
      `${a.appointment_date}${a.appointment_time}`,
    ),
  );
}

export function saveAppointment(
  data: Omit<LocalAppointment, "id" | "created_at" | "status">,
): LocalAppointment {
  const appt: LocalAppointment = {
    ...data,
    id: crypto.randomUUID(),
    status: "confirmado",
    created_at: new Date().toISOString(),
  };
  const all = read<LocalAppointment>(APPTS_KEY);
  all.push(appt);
  write(APPTS_KEY, all);
  return appt;
}

export function updateAppointmentStatusLocal(
  id: string,
  status: LocalAppointment["status"],
) {
  const all = read<LocalAppointment>(APPTS_KEY);
  const idx = all.findIndex((a) => a.id === id);
  if (idx >= 0) {
    all[idx]!.status = status;
    write(APPTS_KEY, all);
  }
}

/* ─── HOLDS (bloqueio temporário de 60s) ─────────────────────────
 * Sem servidor real disponível neste ambiente, a atomicidade entre
 * abas/dispositivos diferentes não pode ser garantida por localStorage.
 * Em produção com Supabase configurado, use a constraint UNIQUE em
 * booking_holds (appointment_date, appointment_time) — ver supabase.ts.
 * ──────────────────────────────────────────────────────────────── */
function cleanExpiredHolds(): LocalHold[] {
  const holds = read<LocalHold>(HOLDS_KEY).filter(
    (h) => new Date(h.expires_at).getTime() > Date.now(),
  );
  write(HOLDS_KEY, holds);
  return holds;
}

export function isSlotTaken(date: string, time: string): boolean {
  const appts = read<LocalAppointment>(APPTS_KEY);
  const taken = appts.some(
    (a) =>
      a.appointment_date === date &&
      a.appointment_time === time &&
      a.status !== "cancelado",
  );
  if (taken) return true;
  const holds = cleanExpiredHolds();
  return holds.some((h) => h.appointment_date === date && h.appointment_time === time);
}

export function createHoldLocal(date: string, time: string): LocalHold | null {
  if (isSlotTaken(date, time)) return null;
  const hold: LocalHold = {
    id: crypto.randomUUID(),
    appointment_date: date,
    appointment_time: time,
    expires_at: new Date(Date.now() + 60_000).toISOString(),
  };
  const holds = cleanExpiredHolds();
  holds.push(hold);
  write(HOLDS_KEY, holds);
  return hold;
}

export function releaseHoldLocal(id: string) {
  const holds = read<LocalHold>(HOLDS_KEY).filter((h) => h.id !== id);
  write(HOLDS_KEY, holds);
}

export function getHoldExpiry(id: string): number | null {
  const holds = read<LocalHold>(HOLDS_KEY);
  const hold = holds.find((h) => h.id === id);
  return hold ? new Date(hold.expires_at).getTime() : null;
}
