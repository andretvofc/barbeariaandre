import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth-context";
import { signIn, getProfile } from "../../lib/supabase";

interface LoginFormProps {
  onSwitchToRegister: () => void;
  redirectTo?: string;
}

export default function LoginForm({ onSwitchToRegister, redirectTo = "/agendar" }: LoginFormProps) {
  const { setSession, setProfile } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await signIn(email, password);
      if (!data?.access_token) throw new Error("Credenciais inválidas.");
      setSession(data);
      const profile = await getProfile(data.user.id, data.access_token);
      if (profile) setProfile(profile);
      navigate({ to: redirectTo });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao entrar.";
      setError(msg.includes("Invalid login") ? "E-mail ou senha incorretos." : msg);
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
        Entrar
      </h2>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.875rem",
        color: "oklch(0.58 0.018 60)",
        marginBottom: "2rem",
      }}>
        Acesse sua conta para agendar.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
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
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <p style={{
        marginTop: "1.5rem",
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.83rem",
        color: "oklch(0.55 0.015 60)",
      }}>
        Não tem conta?{" "}
        <button
          onClick={onSwitchToRegister}
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
          Criar conta
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
