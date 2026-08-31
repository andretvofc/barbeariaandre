export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: "oklch(0.08 0.004 60)",
      borderTop: "1px solid oklch(1 0 0 / 6%)",
      padding: "3rem 1.5rem",
    }}>
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
              <circle cx="28" cy="28" r="27" stroke="oklch(0.80 0.12 85)" strokeWidth="1.5"/>
              <path d="M20 18 L36 38M20 38 L36 18" stroke="oklch(0.80 0.12 85)" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="18" cy="38" r="3.5" stroke="oklch(0.80 0.12 85)" strokeWidth="1.2"/>
              <circle cx="38" cy="38" r="3.5" stroke="oklch(0.80 0.12 85)" strokeWidth="1.2"/>
            </svg>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "oklch(0.95 0.008 60)",
              letterSpacing: "0.08em",
            }}>BARBEARIA ANDRE</span>
          </div>

          {/* Links */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { label: "A Barbearia", href: "#about" },
              { label: "Serviços", href: "#services" },
              { label: "Profissionais", href: "#team" },
              { label: "Localização", href: "#location" },
              { label: "Privacidade", href: "/privacidade" },
              { label: "Termos", href: "/termos" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "oklch(0.45 0.012 60)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.80 0.12 85)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.45 0.012 60)")}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="hairline" style={{ marginBottom: "1.75rem" }} />

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            color: "oklch(0.38 0.010 60)",
            letterSpacing: "0.06em",
          }}>
            © {year} Barbearia André. Todos os direitos reservados.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            color: "oklch(0.30 0.008 60)",
            letterSpacing: "0.06em",
          }}>
            ESTILO · PRECISÃO · EXPERIÊNCIA
          </p>
        </div>
      </div>
    </footer>
  );
}
