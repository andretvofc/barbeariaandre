import { useEffect, useState } from "react";
import { useI18n, type Lang } from "../../lib/i18n";
import { siteConfig } from "../../lib/site-config";

const LINKS = [
  { id: "inicio", key: "home" as const },
  { id: "projetos", key: "projects" as const },
  { id: "servicos", key: "services" as const },
  { id: "sobre", key: "about" as const },
  { id: "contato", key: "contact" as const },
];

export default function Header() {
  const { t, lang, setLang } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const langBtn = (value: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      className={`px-1.5 py-0.5 text-xs tracking-wide transition-colors duration-200 rounded ${
        lang === value ? "text-white" : "text-neutral-500 hover:text-neutral-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-white/10 bg-black/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 md:h-20">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            go("inicio");
          }}
          className="text-sm font-medium tracking-tight text-white transition-opacity hover:opacity-70 sm:text-base"
        >
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => {
                e.preventDefault();
                go(l.id);
              }}
              className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
            >
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-0.5 text-xs">
            {langBtn("pt", "PT")}
            <span aria-hidden className="text-neutral-700">
              |
            </span>
            {langBtn("en", "EN")}
          </div>
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault();
              go("contato");
            }}
            className="btn-accent rounded-full px-5 py-2.5 text-sm font-medium"
          >
            {t.nav.quote}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          aria-expanded={open}
          className="flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/5 lg:hidden"
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black/95 backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[26rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto max-w-6xl px-5 py-6 sm:px-8" aria-label="Mobile">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.id);
                  }}
                  className="block py-3 text-lg text-neutral-300 transition-colors hover:text-white"
                >
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-1 text-sm">
              {langBtn("pt", "PT")}
              <span aria-hidden className="text-neutral-700">
                |
              </span>
              {langBtn("en", "EN")}
            </div>
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault();
                go("contato");
              }}
              className="btn-accent rounded-full px-5 py-3 text-sm font-medium"
            >
              {t.nav.quote}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
