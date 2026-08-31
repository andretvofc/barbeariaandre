import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth-context";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleAgendar = () => {
    if (session) navigate({ to: "/agendar" });
    else navigate({ to: "/entrar" });
  };

  return (
    <section
      ref={ref}
      id="agendar-cta"
      style={{
        background: "oklch(0.13 0.006 60)",
        padding: "8rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        borderTop: "1px solid oklch(1 0 0 / 6%)",
        borderBottom: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.80 0.12 85 / 5%), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Large text BG */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(5rem, 18vw, 16rem)",
        fontWeight: 700,
        color: "oklch(1 0 0 / 2%)",
        userSelect: "none",
        pointerEvents: "none",
        lineHeight: 1,
      }}>05</div>

      <div style={{ position: "relative", maxWidth: "42rem", margin: "0 auto" }}>
        <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem" }}>
          <div style={{ width: "2rem", height: "1px", background: "oklch(0.80 0.12 85)" }} />
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "oklch(0.80 0.12 85)",
          }}>Agende seu Horário</span>
          <div style={{ width: "2rem", height: "1px", background: "oklch(0.80 0.12 85)" }} />
        </div>

        <h2 className="reveal" style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 700,
          color: "oklch(0.95 0.008 60)",
          letterSpacing: "-0.02em",
          lineHeight: 1.1,
          marginBottom: "1.5rem",
        }}>
          Reserve o seu<br />
          <span style={{ color: "oklch(0.80 0.12 85)", fontStyle: "italic" }}>momento premium.</span>
        </h2>

        <p className="reveal" style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1rem",
          color: "oklch(0.58 0.018 60)",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}>
          Escolha seu horário, confirme o serviço e apareça.<br />
          O resto é com a gente.
        </p>

        <div className="reveal" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={handleAgendar}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "oklch(0.10 0.005 60)",
              background: "oklch(0.80 0.12 85)",
              border: "none",
              padding: "1rem 2.5rem",
              borderRadius: "2px",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "oklch(0.88 0.10 85)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "oklch(0.80 0.12 85)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Agendar Agora
          </button>

          <a
            href="https://wa.me/5567999999999"
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "oklch(0.80 0.12 85)",
              background: "transparent",
              border: "1px solid oklch(0.80 0.12 85 / 40%)",
              padding: "1rem 2.5rem",
              borderRadius: "2px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.80 0.12 85 / 80%)";
              e.currentTarget.style.background = "oklch(0.80 0.12 85 / 8%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "oklch(0.80 0.12 85 / 40%)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
