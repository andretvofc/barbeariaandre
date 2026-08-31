import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth-context";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "A Barbearia", href: "#about" },
  { label: "Serviços", href: "#services" },
  { label: "Profissionais", href: "#team" },
  { label: "Localização", href: "#location" },
];

export default function Navbar() {
  const { session, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAgendar = () => {
    if (session) navigate({ to: "/agendar" });
    else navigate({ to: "/entrar" });
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
    setOpen(false);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: "4rem",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          transition: "background 0.3s, backdrop-filter 0.3s, border-color 0.3s",
          background: scrolled ? "oklch(0.10 0.005 60 / 92%)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid oklch(1 0 0 / 8%)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", flexShrink: 0 }}>
          <svg width="28" height="28" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="oklch(0.80 0.12 85)" strokeWidth="1.5"/>
            <path d="M20 18 L36 38M20 38 L36 18" stroke="oklch(0.80 0.12 85)" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="18" cy="38" r="3.5" stroke="oklch(0.80 0.12 85)" strokeWidth="1.2"/>
            <circle cx="38" cy="38" r="3.5" stroke="oklch(0.80 0.12 85)" strokeWidth="1.2"/>
          </svg>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1rem",
            fontWeight: 700,
            color: "oklch(0.95 0.008 60)",
            letterSpacing: "0.08em",
          }}>
            BARBEARIA ANDRE
          </span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "2rem", marginLeft: "auto", marginRight: "2rem" }}
          className="hidden md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "oklch(0.58 0.018 60)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.95 0.008 60)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.58 0.018 60)")}
            >
              {l.label}
            </a>
          ))}
          {session && profile?.role === "admin" && (
            <a
              href="/admin"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "oklch(0.80 0.12 85)",
                textDecoration: "none",
              }}
            >
              Admin
            </a>
          )}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {session ? (
            <div className="hidden md:flex items-center gap-3">
              <a
                href="/minha-conta"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  color: "oklch(0.58 0.018 60)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                }}
              >
                {profile?.name?.split(" ")[0] ?? "Conta"}
              </a>
              <button
                onClick={handleLogout}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  color: "oklch(0.58 0.018 60)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                }}
              >
                Sair
              </button>
            </div>
          ) : null}
          <button
            onClick={handleAgendar}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "oklch(0.10 0.005 60)",
              background: "oklch(0.80 0.12 85)",
              border: "none",
              padding: "0.5rem 1.25rem",
              borderRadius: "2px",
              cursor: "pointer",
              transition: "background 0.2s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "oklch(0.88 0.10 85)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "oklch(0.80 0.12 85)")}
          >
            Agendar
          </button>

          {/* Mobile hamburger */}
          <button
            className="flex md:hidden"
            onClick={() => setOpen((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "oklch(0.95 0.008 60)", padding: "0.25rem" }}
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: "oklch(0.10 0.005 60)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.75rem",
                color: "oklch(0.95 0.008 60)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={handleAgendar}
            style={{
              marginTop: "1rem",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "oklch(0.10 0.005 60)",
              background: "oklch(0.80 0.12 85)",
              border: "none",
              padding: "0.75rem 2rem",
              borderRadius: "2px",
              cursor: "pointer",
            }}
          >
            Agendar
          </button>
          {session && (
            <>
              <a href="/minha-conta" onClick={() => setOpen(false)} style={{ color: "oklch(0.58 0.018 60)", textDecoration: "none", fontSize: "0.9rem" }}>
                Minha Conta
              </a>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color: "oklch(0.58 0.018 60)", cursor: "pointer", fontSize: "0.9rem" }}>
                Sair
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
