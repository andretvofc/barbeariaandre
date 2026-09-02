export default function Gallery() {
  const items = [
    {
      src: "/image.png",
      title: "Estilo 01",
      tag: "Clássico",
    },
    {
      src: "/image-1.png",
      title: "Estilo 02",
      tag: "Moderno",
    },
  ];

  return (
    <section
      id="gallery"
      style={{
        background: "oklch(0.10 0.005 60)",
        padding: "6rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ width: "2rem", height: "1px", background: "oklch(0.80 0.12 85)" }} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "oklch(0.80 0.12 85)",
              }}
            >
              Inspirações
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "oklch(0.95 0.008 60)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Galeria de Cortes
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1rem",
              color: "oklch(0.58 0.018 60)",
              maxWidth: "36rem",
              lineHeight: 1.7,
            }}
          >
            Cada estilo é feito sob medida. Confira alguns exemplos de cortes
            realizados na nossa barbearia.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 20rem), 1fr))",
            gap: "1.5rem",
          }}
        >
          {items.map((item, i) => (
            <GalleryCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryCard({
  item,
  index,
}: {
  item: { src: string; title: string; tag: string };
  index: number;
}) {
  return (
    <div
      className="reveal"
      style={{
        animationDelay: `${index * 100}ms`,
        position: "relative",
        overflow: "hidden",
        aspectRatio: "4 / 5",
        background: "oklch(0.13 0.006 60)",
        border: "1px solid oklch(1 0 0 / 8%)",
      }}
    >
      <img
        src={item.src}
        alt={item.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "grayscale(0.15)",
          transition: "transform 0.5s ease, filter 0.5s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
          (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLImageElement).style.filter = "grayscale(0.15)";
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, transparent 50%, oklch(0.08 0.004 60 / 90%) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "1.25rem",
          bottom: "1.25rem",
          right: "1.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "oklch(0.80 0.12 85)",
          }}
        >
          {item.tag}
        </span>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "oklch(0.95 0.008 60)",
            marginTop: "0.25rem",
          }}
        >
          {item.title}
        </h3>
      </div>
    </div>
  );
}
