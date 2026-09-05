import { useI18n } from "../../lib/i18n";

export default function Hero() {
  const { t } = useI18n();

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32 md:pb-28"
    >
      {/* brilho sutil de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.07] blur-3xl"
        style={{ background: "radial-gradient(circle, #fff 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <p className="reveal reveal-in inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-xs text-neutral-300 sm:text-[13px]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[var(--adr-accent)]"
              aria-hidden
            />
            {t.hero.badge}
          </p>

          <h1 className="mt-7 text-balance text-[2.15rem] font-medium leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-[4.15rem]">
            {t.hero.title}
          </h1>

          <p className="mt-7 max-w-2xl text-pretty text-base leading-relaxed text-neutral-400 sm:text-lg">
            {t.hero.subtitle}
          </p>

          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-neutral-500 sm:text-[17px]">
            {t.hero.complement}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => go("contato")}
              className="btn-accent w-full rounded-full px-7 py-4 text-[15px] font-medium sm:w-auto"
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              type="button"
              onClick={() => go("projetos")}
              className="btn-ghost w-full rounded-full px-7 py-4 text-[15px] font-medium sm:w-auto"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
