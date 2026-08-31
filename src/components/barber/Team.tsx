import { useEffect, useRef } from "react";
import { Scissors, Award, Star } from "lucide-react";

const TEAM = [
  {
    name: "André",
    role: "Fundador & Barbeiro",
    exp: "8 anos",
    specialty: "Corte Clássico & Degradê",
    icon: Award,
  },
  {
    name: "Lucas",
    role: "Barbeiro Senior",
    exp: "5 anos",
    specialty: "Barba & Navalha",
    icon: Scissors,
  },
  {
    name: "Rafael",
    role: "Barbeiro",
    exp: "3 anos",
    specialty: "Fade & Sobrancelha",
    icon: Star,
  },
];

export default function Team() {
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
      id="team"
      ref={ref}
      style={{
        background: "oklch(0.10 0.005 60)",
        padding: "7rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative */}
      <div style={{
        position: "absolute",
        left: "-3rem",
        top: "50%",
        transform: "translateY(-50%)",
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(8rem, 18vw, 16rem)",
        fontWeight: 700,
        color: "oklch(1 0 0 / 2%)",
        lineHeight: 1,
        userSelect: "none",
        pointerEvents: "none",
      }}>04</div>

      <div style={{ maxWidth: "72rem", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div style={{ width: "2rem", height: "1px", background: "oklch(0.80 0.12 85)" }} />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "oklch(0.80 0.12 85)",
            }}>Nossa Equipe</span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "oklch(0.95 0.008 60)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}>
            Profissionais<br />
            <span style={{ color: "oklch(0.80 0.12 85)", fontStyle: "italic" }}>dedicados a você.</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 18rem), 1fr))",
          gap: "1.5rem",
        }}>
          {TEAM.map((member, i) => {
            const Icon = member.icon;
            return (
              <div
                key={member.name}
                className="reveal"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  style={{
                    background: "oklch(0.13 0.006 60)",
                    border: "1px solid oklch(1 0 0 / 6%)",
                    padding: "2.5rem 2rem",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.3s, background 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(0.80 0.12 85 / 30%)";
                    (e.currentTarget as HTMLDivElement).style.background = "oklch(0.15 0.008 60)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "oklch(1 0 0 / 6%)";
                    (e.currentTarget as HTMLDivElement).style.background = "oklch(0.13 0.006 60)";
                  }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: "4rem",
                    height: "4rem",
                    borderRadius: "50%",
                    border: "1px solid oklch(0.80 0.12 85 / 30%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    background: "oklch(0.80 0.12 85 / 6%)",
                  }}>
                    <Icon size={20} color="oklch(0.80 0.12 85)" />
                  </div>

                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "oklch(0.95 0.008 60)",
                    marginBottom: "0.25rem",
                  }}>{member.name}</div>

                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.80 0.12 85)",
                    marginBottom: "1.25rem",
                  }}>{member.role}</div>

                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                      color: "oklch(0.58 0.018 60)",
                    }}>
                      <span style={{ color: "oklch(0.70 0.015 60)" }}>Experiência:</span> {member.exp}
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                      color: "oklch(0.58 0.018 60)",
                    }}>
                      <span style={{ color: "oklch(0.70 0.015 60)" }}>Especialidade:</span> {member.specialty}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
