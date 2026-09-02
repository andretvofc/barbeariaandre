import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Intro from "../components/barber/Intro";
import Navbar from "../components/barber/Navbar";
import Hero from "../components/barber/Hero";
import About from "../components/barber/About";
import Services from "../components/barber/Services";
import Gallery from "../components/barber/Gallery";
import Team from "../components/barber/Team";
import CTA from "../components/barber/CTA";
import Location from "../components/barber/Location";
import Footer from "../components/barber/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

const INTRO_SEEN_KEY = "barber_intro_seen";

function Index() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_SEEN_KEY);
    if (!seen) {
      setShowIntro(true);
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    }
  }, []);

  return (
    <div style={{ background: "oklch(0.10 0.005 60)" }}>
      {showIntro && <Intro onDone={() => setShowIntro(false)} />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Team />
        <CTA />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
