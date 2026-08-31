import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth-context";
import { signUp, createProfile, checkCpfExists, IS_CONFIGURED } from "../../lib/supabase";
import { normalizeCpf } from "../../lib/integrations";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
  redirectTo?: string;
}

function isValidCpf(cpf: string): boolean {
  const d = cpf.replace(/\D/g, "");
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += Number(d[i]) * (10 - i);
  let rev = 11 - (sum % 11);
  if (rev >= 10) rev = 0;
  if (rev !== Number(d[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) sum += Number(d[i]) * (11 - i);
  rev = 11 - (sum % 11);
  if (rev >= 10) rev = 0;
  return rev === Number(d[10]);
}

function formatCpf(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
}

function formatPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  return d
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export default function RegisterForm({ onSwitchToLogin, redirectTo = "/agendar" }: RegisterFormProps) {
  const { setSession, setProfile } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidCpf(cpf)) {
      setError("CPF inválido. Confira os números digitados.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (!agreed) {
      setError("É preciso aceitar os Termos de Uso e a Política de Privacidade.");
      return;
    }

    const cpfNormalized = normalizeCpf(cpf);
    setLoading(true);
    try {
      if (!IS_CONFIGURED) {
        // Fallback local: valida unicidade de CPF via localStorage.
        const key = "barber_profiles_local";
        const raw = localStorage.getItem(key);
        const list: Array<{ cpf: string }> = raw ? JSON.parse(raw) : [];
        if (list.some((p) => p.cpf === cpfNormalized)) {
          setError("Este CPF já possui cadastro. Faça login para continuar.");
          setLoading(false);
          return;
        }
        const userId = crypto.randomUUID();
        const profileData = { id: userId, user_id: userId, name, cpf: cpfNormalized, phone: formatPhone(phone), email };
        list.push(profileData);
        localStorage.setItem(key, JSON.stringify(list));
        setSession({ access_token: `local-${userId}`, user: { id: userId, email } });
        setProfile(profileData);
        navigate({ to: redirectTo });
        return;
      }

      const cpfExists = await checkCpfExists(cpfNormalized);
      if (cpfExists) {
        setError("Este CPF já possui cadastro. Faça login para continuar.");
        setLoading(false);
        return;
      }

      const authData = await signUp(email, password);
      if (!authData?.access_token || !authData?.user?.id) {
        throw new Error("Não foi possível criar a conta.");
      }

      const profileData = await createProfile(
        {
          user_id: authData.user.id,
          name,
          cpf: cpfNormalized,
          phone: formatPhone(phone),
          email,
        },
        authData.access_token,
      );

      setSession(authData);
      setProfile(Array.isArray(profileData) ? profileData[0] : profileData);
      navigate({ to: redirectTo });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao criar conta.";
      setError(msg.includes("duplicate") || msg.includes("unique") ? "Este CPF já possui cadastro. Faça login para continuar." : msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "1.75rem",
        fontWeight: 700,
        color: "oklch(0.95 0.008 60)",
        marginBottom: "0.5rem",
        letterSpacing: "-0.02em",
      }}>
        Criar Conta
      </h2>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.875rem",
        color: "oklch(0.58 0.018 60)",
        marginBottom: "2rem",
      }}>
        Cadastre-se para agendar seu horário.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        <div>
          <label style={labelStyle}>Nome completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="João da Silva"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.80 0.12 85)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(1 0 0 / 12%)")}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>CPF</label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              required
              placeholder="000.000.000-00"
              maxLength={14}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.80 0.12 85)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(1 0 0 / 12%)")}
            />
          </div>
          <div>
            <label style={labelStyle}>WhatsApp</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              required
              placeholder="(67) 99999-9999"
              maxLength={15}
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.80 0.12 85)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(1 0 0 / 12%)")}
            />
          </div>
        </div>

        <div>
          <label style={labelStyle}>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="seu@email.com"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.80 0.12 85)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(1 0 0 / 12%)")}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.80 0.12 85)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(1 0 0 / 12%)")}
            />
          </div>
          <div>
            <label style={labelStyle}>Confirmar</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "oklch(0.80 0.12 85)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "oklch(1 0 0 / 12%)")}
            />
          </div>
        </div>

        <label style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.6rem",
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.78rem",
          color: "oklch(0.58 0.018 60)",
          lineHeight: 1.5,
          cursor: "pointer",
        }}>
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ marginTop: "3px", accentColor: "oklch(0.80 0.12 85)" }}
          />
          <span>
            Li e concordo com os{" "}
            <a href="/termos" style={{ color: "oklch(0.80 0.12 85)" }}>Termos de Uso</a>{" "}
            e a{" "}
            <a href="/privacidade" style={{ color: "oklch(0.80 0.12 85)" }}>Política de Privacidade</a>.
          </span>
        </label>

        {error && (
          <div style={{
            background: "oklch(0.62 0.22 25 / 12%)",
            border: "1px solid oklch(0.62 0.22 25 / 30%)",
            borderRadius: "2px",
            padding: "0.75rem 1rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.83rem",
            color: "oklch(0.75 0.15 25)",
          }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "oklch(0.10 0.005 60)",
            background: loading ? "oklch(0.65 0.08 85)" : "oklch(0.80 0.12 85)",
            border: "none",
            padding: "0.9rem",
            borderRadius: "2px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
            width: "100%",
          }}
        >
          {loading ? "Criando conta..." : "Criar Conta"}
        </button>
      </form>

      <p style={{
        marginTop: "1.5rem",
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.83rem",
        color: "oklch(0.55 0.015 60)",
      }}>
        Já tem conta?{" "}
        <button
          onClick={onSwitchToLogin}
          style={{
            background: "none",
            border: "none",
            color: "oklch(0.80 0.12 85)",
            cursor: "pointer",
            fontSize: "0.83rem",
            fontFamily: "'Inter', sans-serif",
            textDecoration: "underline",
          }}
        >
          Entrar
        </button>
      </p>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.72rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "oklch(0.58 0.018 60)",
  marginBottom: "0.5rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "oklch(0.13 0.006 60)",
  border: "1px solid oklch(1 0 0 / 12%)",
  borderRadius: "2px",
  padding: "0.75rem 1rem",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9rem",
  color: "oklch(0.95 0.008 60)",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};
