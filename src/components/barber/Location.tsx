import { useEffect, useRef } from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const HOURS = [
  { day: "Segunda — Sexta", time: "09:00 – 19:00" },
  { day: "Sábado", time: "09:00 – 17:00" },
  { day: "Domingo", time: "Fechado" },
];

export default function Location() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="location"
      ref={ref}
      style={{
        background: "oklch(0.10 0.005 60)",
        padding: "7rem 1.5rem",
        borderTop: "1px solid oklch(1 0 0 / 6%)",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 26rem), 1fr))",
          gap: "4rem",
          alignItems: "start",
        }}>
          {/* Left */}
          <div>
            <div className="reveal" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
              <div style={{ width: "2rem", height: "1px", background: "oklch(0.80 0.12 85)" }} />
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "oklch(0.80 0.12 85)",
              }}>Localização</span>
            </div>

            <h2 className="reveal" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "oklch(0.95 0.008 60)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "2.5rem",
            }}>
              Nos encontre<br />
              <span style={{ color: "oklch(0.80 0.12 85)", fontStyle: "italic" }}>aqui.</span>
            </h2>

            {/* Info blocks */}
            <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "2.5rem", height: "2.5rem", flexShrink: 0,
                  border: "1px solid oklch(0.80 0.12 85 / 25%)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <MapPin size={16} color="oklch(0.80 0.12 85)" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.58 0.018 60)", marginBottom: "0.3rem" }}>Endereço</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "oklch(0.85 0.008 60)", lineHeight: 1.5 }}>
                    Rua das Acácias, 123 — Centro<br />Campo Grande, MS
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "2.5rem", height: "2.5rem", flexShrink: 0,
                  border: "1px solid oklch(0.80 0.12 85 / 25%)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Phone size={16} color="oklch(0.80 0.12 85)" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.58 0.018 60)", marginBottom: "0.3rem" }}>WhatsApp</div>
                  <a href="https://wa.me/5567999999999" target="_blank" rel="noreferrer" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: "oklch(0.80 0.12 85)", textDecoration: "none" }}>
                    (67) 9 9999-9999
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{
                  width: "2.5rem", height: "2.5rem", flexShrink: 0,
                  border: "1px solid oklch(0.80 0.12 85 / 25%)",
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Clock size={16} color="oklch(0.80 0.12 85)" />
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.58 0.018 60)", marginBottom: "0.5rem" }}>Horários</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {HOURS.map((h) => (
                      <div key={h.day} style={{ display: "flex", gap: "1rem", justifyContent: "space-between", maxWidth: "18rem" }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: "oklch(0.65 0.015 60)" }}>{h.day}</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: h.time === "Fechado" ? "oklch(0.45 0.015 60)" : "oklch(0.85 0.008 60)" }}>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Map placeholder */}
          <div className="reveal">
            <div style={{
              background: "oklch(0.13 0.006 60)",
              border: "1px solid oklch(1 0 0 / 8%)",
              aspectRatio: "4/3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Grid pattern */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "repeating-linear-gradient(oklch(1 0 0 / 3%) 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, oklch(1 0 0 / 3%) 0 1px, transparent 1px 100%)",
                backgroundSize: "40px 40px",
              }} />
              <MapPin size={32} color="oklch(0.80 0.12 85)" style={{ position: "relative" }} />
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.78rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "oklch(0.58 0.018 60)",
                position: "relative",
              }}>
                Barbearia André
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                style={{
                  position: "relative",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "oklch(0.80 0.12 85)",
                  textDecoration: "none",
                  borderBottom: "1px solid oklch(0.80 0.12 85 / 40%)",
                  paddingBottom: "2px",
                }}
              >
                Ver no Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
