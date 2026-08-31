export default function Services() {
  const services = [
    {
      name: "Corte Clássico",
      desc: "Tesoura ou máquina, acabamento impecável que respeita o seu estilo.",
      price: "R$ 50",
      duration: "45 min",
    },
    {
      name: "Barba Completa",
      desc: "Navalha quente, toalha quente e hidratação para uma barba perfeita.",
      price: "R$ 40",
      duration: "30 min",
    },
    {
      name: "Corte + Barba",
      desc: "O combo ideal: corte personalizado e barba trabalhada em uma sessão.",
      price: "R$ 80",
      duration: "1h 15min",
    },
    {
      name: "Degradê",
      desc: "Fade perfeito com transição suave e acabamento nas laterais.",
      price: "R$ 55",
      duration: "50 min",
    },
    {
      name: "Sobrancelha",
      desc: "Design e limpeza para dar mais expressão ao olhar.",
      price: "R$ 20",
      duration: "15 min",
    },
    {
      name: "Hidratação Capilar",
      desc: "Tratamento nutritivo para cabelos danificados ou ressecados.",
      price: "R$ 35",
      duration: "30 min",
    },
  ];

  return (
    <section
      id="services"
      style={{
        background: "oklch(0.13 0.006 60)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Header */}
        <div
          className="reveal"
          style={{ marginBottom: "4rem" }}
        >
          <div style={{
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
              O que oferecemos
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 700,
            color: "oklch(0.95 0.008 60)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "1rem",
          }}>
            Nossos Serviços
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "1rem",
            color: "oklch(0.58 0.018 60)",
            maxWidth: "36rem",
            lineHeight: 1.7,
          }}>
            Cada serviço é executado com precisão e cuidado, usando produtos premium
            e técnicas atualizadas para o melhor resultado.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 18rem), 1fr))",
          gap: "1px",
          background: "oklch(1 0 0 / 6%)",
          border: "1px solid oklch(1 0 0 / 6%)",
        }}>
          {services.map((s, i) => (
            <ServiceCard key={s.name} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: { name: string; desc: string; price: string; duration: string };
  index: number;
}) {
  return (
    <div
      className="reveal"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        style={{
          background: "oklch(0.13 0.006 60)",
          padding: "2rem",
          height: "100%",
          transition: "background 0.2s",
          cursor: "default",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "oklch(0.15 0.008 60)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = "oklch(0.13 0.006 60)";
        }}
      >
        {/* accent line */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "2px",
          height: "0",
          background: "oklch(0.80 0.12 85)",
          transition: "height 0.3s ease",
        }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.height = "100%")}
        />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "oklch(0.95 0.008 60)",
            lineHeight: 1.2,
          }}>
            {service.name}
          </h3>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "oklch(0.80 0.12 85)",
            whiteSpace: "nowrap",
            marginLeft: "1rem",
          }}>
            {service.price}
          </span>
        </div>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.875rem",
          color: "oklch(0.58 0.018 60)",
          lineHeight: 1.6,
          marginBottom: "1.25rem",
        }}>
          {service.desc}
        </p>

        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "oklch(0.40 0.012 60)",
        }}>
          ⏱ {service.duration}
        </span>
      </div>
    </div>
  );
}
