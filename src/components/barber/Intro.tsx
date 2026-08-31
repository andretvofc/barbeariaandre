import { useEffect, useRef } from "react";

interface IntroProps {
  onDone: () => void;
}

export default function Intro({ onDone }: IntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Animação pura via Web Animations API — sem dependência de GSAP */
    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const tag = taglineRef.current;
    if (!overlay || !logo || !tag) return;

    const dur = 600;

    /* logo entra */
    logo.animate([{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }], {
      duration: dur,
      delay: 300,
      fill: "forwards",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });

    /* tagline entra */
    tag.animate([{ opacity: 0, transform: "translateY(12px)" }, { opacity: 1, transform: "translateY(0)" }], {
      duration: dur,
      delay: 900,
      fill: "forwards",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    });

    /* overlay sai */
    const fadeOut = overlay.animate(
      [{ opacity: 1 }, { opacity: 0 }],
      { duration: 600, delay: 2800, fill: "forwards", easing: "ease-in-out" },
    );

    fadeOut.onfinish = () => onDone();
  }, [onDone]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "oklch(0.08 0.004 60)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        pointerEvents: "none",
      }}
    >
      {/* logo icon */}
      <div
        ref={logoRef}
        style={{ opacity: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="28" cy="28" r="27" stroke="oklch(0.80 0.12 85)" strokeWidth="1.5"/>
          {/* scissors */}
          <path d="M20 18 L36 38M20 38 L36 18" stroke="oklch(0.80 0.12 85)" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="18" cy="38" r="3.5" stroke="oklch(0.80 0.12 85)" strokeWidth="1.2"/>
          <circle cx="38" cy="38" r="3.5" stroke="oklch(0.80 0.12 85)" strokeWidth="1.2"/>
        </svg>

        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "oklch(0.95 0.008 60)",
            textTransform: "uppercase",
          }}>
            BARBEARIA
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            color: "oklch(0.80 0.12 85)",
            textTransform: "uppercase",
            marginTop: "0.25rem",
          }}>
            ANDRE
          </div>
        </div>
      </div>

      {/* tagline */}
      <div
        ref={taglineRef}
        style={{
          opacity: 0,
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.7rem",
          letterSpacing: "0.4em",
          color: "oklch(0.58 0.018 60)",
          textTransform: "uppercase",
        }}
      >
        ESTILO · PRECISÃO · EXPERIÊNCIA
      </div>
    </div>
  );
}
