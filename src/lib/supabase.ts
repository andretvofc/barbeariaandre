/**
 * Supabase client — configure as variáveis de ambiente:
 *
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=eyJhbGci...
 *
 * O arquivo .env.local NÃO deve ser commitado.
 * Para integração real, crie o projeto em https://supabase.com e cole as chaves.
 */

const SUPABASE_URL = import.meta.env['VITE_SUPABASE_URL'] as string;
const SUPABASE_ANON_KEY = import.meta.env['VITE_SUPABASE_ANON_KEY'] as string;

const IS_CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

/* ─── Tiny fetch wrapper (sem SDK pra manter bundle pequeno) ── */
async function supaFetch(
  path: string,
  options: RequestInit = {},
  token?: string,
) {
  if (!IS_CONFIGURED) throw new Error("SUPABASE_NOT_CONFIGURED");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token ?? SUPABASE_ANON_KEY}`,
    ...(options.headers as Record<string, string>),
  };
  const res = await fetch(`${SUPABASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? res.statusText);
  }
  return res.json();
}

/* ─── AUTH ────────────────────────────────────────────────────── */
export async function signUp(email: string, password: string) {
  return supaFetch("/auth/v1/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signIn(email: string, password: string) {
  return supaFetch("/auth/v1/token?grant_type=password", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function signOut(token: string) {
  return supaFetch("/auth/v1/logout", { method: "POST" }, token);
}

/* ─── PROFILES ────────────────────────────────────────────────── */
export async function createProfile(
  data: {
    user_id: string;
    name: string;
    cpf: string;
    phone: string;
    email: string;
  },
  token: string,
) {
  return supaFetch(
    "/rest/v1/profiles",
    { method: "POST", body: JSON.stringify(data) },
    token,
  );
}

export async function getProfile(userId: string, token: string) {
  return supaFetch(
    `/rest/v1/profiles?user_id=eq.${userId}&select=*`,
    {},
    token,
  ).then((arr: unknown[]) => arr[0] ?? null);
}

export async function checkCpfExists(cpf: string): Promise<boolean> {
  const data = await supaFetch(
    `/rest/v1/profiles?cpf=eq.${cpf}&select=id`,
  ).catch(() => []);
  return Array.isArray(data) && data.length > 0;
}

/* ─── SERVICES ────────────────────────────────────────────────── */
export async function getServices() {
  return supaFetch("/rest/v1/services?active=eq.true&select=*&order=name.asc");
}

/* ─── BOOKING HOLDS ───────────────────────────────────────────── */
export async function createHold(
  data: {
    user_id: string;
    appointment_date: string;
    appointment_time: string;
    service_id: string;
  },
  token: string,
) {
  /* expires_at = now + 60s — o banco deve ter DEFAULT ou trigger, mas garantimos aqui também */
  const expires_at = new Date(Date.now() + 60_000).toISOString();
  return supaFetch(
    "/rest/v1/booking_holds",
    {
      method: "POST",
      body: JSON.stringify({ ...data, expires_at }),
      headers: { Prefer: "return=representation" },
    },
    token,
  );
}

export async function releaseHold(holdId: string, token: string) {
  return supaFetch(
    `/rest/v1/booking_holds?id=eq.${holdId}`,
    { method: "DELETE" },
    token,
  );
}

/* ─── APPOINTMENTS ────────────────────────────────────────────── */
export async function getAvailableSlots(date: string, serviceId: string) {
  /* Retorna agendamentos confirmados + holds ativos */
  const [appts, holds] = await Promise.all([
    supaFetch(
      `/rest/v1/appointments?appointment_date=eq.${date}&service_id=eq.${serviceId}&status=neq.cancelado&select=appointment_time`,
    ),
    supaFetch(
      `/rest/v1/booking_holds?appointment_date=eq.${date}&service_id=eq.${serviceId}&expires_at=gt.${new Date().toISOString()}&select=appointment_time`,
    ),
  ]);
  const taken = new Set([
    ...(appts as { appointment_time: string }[]).map((a) => a.appointment_time),
    ...(holds as { appointment_time: string }[]).map((h) => h.appointment_time),
  ]);
  return taken;
}

export async function confirmAppointment(
  data: {
    user_id: string;
    customer_name: string;
    customer_phone: string;
    service_id: string;
    appointment_date: string;
    appointment_time: string;
  },
  holdId: string,
  token: string,
) {
  /* 1. Insere agendamento */
  const [appt] = await supaFetch(
    "/rest/v1/appointments",
    {
      method: "POST",
      body: JSON.stringify({ ...data, status: "confirmado" }),
      headers: { Prefer: "return=representation" },
    },
    token,
  );
  /* 2. Remove hold */
  await releaseHold(holdId, token);
  return appt;
}

export async function getMyAppointments(userId: string, token: string) {
  return supaFetch(
    `/rest/v1/appointments?user_id=eq.${userId}&select=*,services(name,price)&order=appointment_date.desc`,
    {},
    token,
  );
}

/* ─── ADMIN ───────────────────────────────────────────────────── */
export async function getAllAppointments(token: string) {
  return supaFetch(
    "/rest/v1/appointments?select=*,services(name),profiles(name,phone,cpf)&order=appointment_date.asc,appointment_time.asc",
    {},
    token,
  );
}

export async function getAllClients(token: string) {
  return supaFetch(
    "/rest/v1/profiles?select=*&order=created_at.desc",
    {},
    token,
  );
}

export async function updateAppointmentStatus(
  id: string,
  status: string,
  token: string,
) {
  return supaFetch(
    `/rest/v1/appointments?id=eq.${id}`,
    { method: "PATCH", body: JSON.stringify({ status }) },
    token,
  );
}

export { IS_CONFIGURED };
