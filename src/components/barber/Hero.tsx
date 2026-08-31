import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth-context";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headRef.current, subRef.current, btnRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.animate(
        [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 700, delay: 200 + i * 150, fill: "forwards", easing: "cubic-bezier(0.22,1,0.36,1)" },
      );
    });
  }, []);

  const handleAgendar = () => {
    if (session) navigate({ to: "/agendar" });
    else navigate({ to: "/entrar" });
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        background: "oklch(0.10 0.005 60)",
      }}
    >
      {/* Background gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, oklch(0.80 0.12 85 / 6%), transparent 70%)," +
            "radial-gradient(ellipse 50% 80% at 10% 80%, oklch(0.80 0.12 85 / 4%), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Decorative vertical line */}
      <div style={{
        position: "absolute",
        left: "calc(50% + 180px)",
        top: "15%",
        width: "1px",
        height: "70%",
        background: "linear-gradient(to bottom, transparent, oklch(0.80 0.12 85 / 20%), transparent)",
      }} className="hidden lg:block" />

      {/* Content */}
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          width: "100%",
          paddingTop: "5rem",
        }}
      >
        <div style={{ maxWidth: "36rem" }}>
          {/* eyebrow */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "2rem",
            opacity: 0,
            animation: "fadeUp 0.6s 0.1s forwards",
          }}>
            <div style={{ width: "2rem", height: "1px", background: "oklch(0.80 0.12 85)" }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "oklch(0.80 0.12 85)",
            }}>
              Barbearia Premium
            </span>
          </div>

          <h1
            ref={headRef}
            style={{
              opacity: 0,
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "oklch(0.95 0.008 60)",
              marginBottom: "1.5rem",
            }}
          >
            Seu Estilo<br />
            <span style={{ color: "oklch(0.80 0.12 85)" }}>Começa</span> Aqui.
          </h1>

          <p
            ref={subRef}
            style={{
              opacity: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "oklch(0.58 0.018 60)",
              marginBottom: "2.5rem",
              maxWidth: "28rem",
            }}
          >
            Corte, barba e experiência premium.<br />
            Cada detalhe importa. Cada visita, inesquecível.
          </p>

          <div
            ref={btnRef}
            style={{ opacity: 0, display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
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
                padding: "0.9rem 2rem",
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
              Agendar Horário
            </button>

            <a
              href="#about"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "oklch(0.80 0.12 85)",
                background: "transparent",
                border: "1px solid oklch(0.80 0.12 85 / 40%)",
                padding: "0.9rem 2rem",
                borderRadius: "2px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
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
              Conhecer a Barbearia
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          gap: "3rem",
          marginTop: "5rem",
          paddingTop: "2.5rem",
          borderTop: "1px solid oklch(1 0 0 / 8%)",
          flexWrap: "wrap",
        }}>
          {[
            { value: "8+", label: "Anos de Experiência" },
            { value: "2k+", label: "Clientes Satisfeitos" },
            { value: "100%", label: "Qualidade Garantida" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                fontWeight: 700,
                color: "oklch(0.80 0.12 85)",
                lineHeight: 1,
              }}>{s.value}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(0.58 0.018 60)",
                marginTop: "0.35rem",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
        color: "oklch(0.58 0.018 60)",
      }}>
        <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'Inter', sans-serif" }}>
          Scroll
        </span>
        <ChevronDown size={16} style={{ animation: "bounce 2s infinite" }} />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
