import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agendar")({
  head: () => ({
    meta: [
      { title: "Agendar horário | Barbearia André" },
      { name: "description", content: "Escolha serviço, profissional e horário para o seu corte na Barbearia André." },
      { property: "og:title", content: "Agendar horário | Barbearia André" },
      { property: "og:description", content: "Reserve seu horário na Barbearia André em poucos cliques." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgendarPage,
});

function AgendarPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold text-foreground">Agendar</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          O fluxo de agendamento online estará disponível em breve.
        </p>
      </div>
    </main>
  );
}
