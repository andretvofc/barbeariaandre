import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../lib/auth-context";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar | Barbearia André" },
      { name: "description", content: "Acesse sua conta para agendar cortes e barba na Barbearia André." },
      { property: "og:title", content: "Entrar | Barbearia André" },
      { property: "og:description", content: "Acesse sua conta para agendar na Barbearia André." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EntrarPage,
});

function EntrarPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");

  useEffect(() => {
    if (session) navigate({ to: "/agendar" });
  }, [session, navigate]);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "oklch(0.10 0.005 60)",
        padding: "2rem 1.5rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "26rem" }}>
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
            marginBottom: "2.5rem",
            justifyContent: "center",
          }}
        >
          <svg width="30" height="30" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="oklch(0.80 0.12 85)" strokeWidth="1.5" />
            <path d="M20 18 L36 38M20 38 L36 18" stroke="oklch(0.80 0.12 85)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="38" r="3.5" stroke="oklch(0.80 0.12 85)" strokeWidth="1.2" />
            <circle cx="38" cy="38" r="3.5" stroke="oklch(0.80 0.12 85)" strokeWidth="1.2" />
          </svg>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "oklch(0.95 0.008 60)",
            letterSpacing: "0.08em",
          }}>
            BARBEARIA ANDRE
          </span>
        </a>

        <div style={{
          background: "oklch(0.13 0.006 60)",
          border: "1px solid oklch(1 0 0 / 8%)",
          borderRadius: "4px",
          padding: "2.25rem 2rem",
        }}>
          {mode === "login" ? (
            <LoginForm onSwitchToRegister={() => setMode("register")} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode("login")} />
          )}
        </div>
      </div>
    </main>
  );
}
