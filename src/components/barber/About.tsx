import { useEffect, useRef } from "react";

const PILLARS = [
  { num: "01", title: "Tradição", desc: "Técnicas clássicas aperfeiçoadas ao longo de anos de ofício." },
  { num: "02", title: "Precisão", desc: "Cada corte executado com atenção milimétrica aos detalhes." },
  { num: "03", title: "Experiência", desc: "Um ambiente que transforma o atendimento em ritual premium." },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: "oklch(0.10 0.005 60)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative number */}
      <div style={{
        position: "absolute",
        right: "-2rem",
        top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(8rem, 18vw, 16rem)",
        fontWeight: 700,
        color: "oklch(1 0 0 / 2%)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}>01</div>

      <div style={{ maxWidth: "72rem", margin: "0 auto", position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))",
          gap: "4rem",
          alignItems: "center",
        }}>
          {/* Left */}
          <div>
            <div className="reveal" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}>
              <div style={{ width: "2rem", height: "1px", background: "oklch(0.80 0.12 85)" }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "oklch(0.80 0.12 85)",
              }}>
                A Barbearia
              </span>
            </div>

            <h2 className="reveal" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 700,
              color: "oklch(0.95 0.008 60)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}>
              Mais do que<br />um corte.
              <br />
              <span style={{ color: "oklch(0.80 0.12 85)", fontStyle: "italic" }}>Uma experiência.</span>
            </h2>

            <p className="reveal" style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              lineHeight: 1.8,
              color: "oklch(0.58 0.018 60)",
              maxWidth: "28rem",
              marginBottom: "2rem",
            }}>
              A Barbearia André nasceu da paixão pelo ofício e pelo cuidado com cada cliente.
              Em um espaço criado para homens que valorizam estilo, precisão e um atendimento
              que respeita o seu tempo.
            </p>

            <a
              href="#services"
              className="reveal"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "oklch(0.80 0.12 85)",
                textDecoration: "none",
                borderBottom: "1px solid oklch(0.80 0.12 85 / 40%)",
                paddingBottom: "2px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "oklch(0.80 0.12 85)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "oklch(0.80 0.12 85 / 40%)")}
            >
              Ver Serviços →
            </a>
          </div>

          {/* Right — pillars */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {PILLARS.map((p, i) => (
              <div
                key={p.num}
                className="reveal"
                style={{
                  padding: "1.75rem 0",
                  borderTop: "1px solid oklch(1 0 0 / 8%)",
                  borderBottom: i === PILLARS.length - 1 ? "1px solid oklch(1 0 0 / 8%)" : "none",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = "oklch(1 0 0 / 2%)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.background = "transparent")
                }
              >
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "oklch(0.80 0.12 85)",
                  flexShrink: 0,
                  paddingTop: "3px",
                }}>{p.num}</span>
                <div>
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "oklch(0.95 0.008 60)",
                    marginBottom: "0.35rem",
                  }}>{p.title}</div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.875rem",
                    color: "oklch(0.55 0.015 60)",
                    lineHeight: 1.6,
                  }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
