import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar | Barbearia André" },
      { name: "description", content: "Acesse sua conta para agendar cortes e barba na Barbearia André." },
      { property: "og:title", content: "Entrar | Barbearia André" },
      { property: "og:description", content: "Acesse sua conta para agendar na Barbearia André." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EntrarPage,
});

function EntrarPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-semibold text-foreground">Entrar</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          O acesso de clientes estará disponível em breve.
        </p>
      </div>
    </main>
  );
}
