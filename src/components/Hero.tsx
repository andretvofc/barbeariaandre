export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* elemento decorativo sutil */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="container relative mx-auto max-w-6xl px-6 text-center">
        <span className="inline-flex items-center rounded-full border border-border px-4 py-1 text-xs uppercase tracking-wide text-muted-foreground">
          André Del Raso
        </span>

        <h1 className="mt-8 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl">
          Eu crio sites e
          <br className="hidden md:block" /> landing pages sob medida
        </h1>

        <p className="mx-auto mt-6 max-w-[52ch] text-lg leading-relaxed text-muted-foreground">
          Do zero até o ar: sites institucionais, landing pages de alta conversão
          e páginas para lançamentos, feitos com atenção a cada detalhe.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contato"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-primary-foreground transition-all duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Solicitar orçamento
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center gap-1 border-b border-primary/40 px-1 py-1 text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Ver serviços
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
