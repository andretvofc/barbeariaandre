/**
 * Projetos do portfólio.
 * Para adicionar/remover um projeto, basta editar este array.
 * Os textos têm versão em português (pt) e inglês (en).
 */

export type Project = {
  id: string;
  name: string;
  image: string;
  imageAlt: { pt: string; en: string };
  category: { pt: string[]; en: string[] };
  description: { pt: string; en: string };
  tech: string[];
  url: string;
};

export const projects: Project[] = [
  {
    id: "pharma-one",
    name: "Pharma One",
    image: "/image.png",
    imageAlt: {
      pt: "Página inicial do site Pharma One em um notebook",
      en: "Pharma One website homepage shown on a laptop",
    },
    category: {
      pt: ["Website", "Catálogo de produtos", "Multilíngue"],
      en: ["Website", "Product catalog", "Multilingual"],
    },
    description: {
      pt: "Desenvolvimento de uma plataforma moderna para apresentação da empresa e seus produtos, com experiência adaptada para diferentes mercados.",
      en: "A modern platform to present the company and its product line, with an experience adapted to different markets.",
    },
    tech: ["React", "TypeScript", "Tailwind"],
    url: "https://andredelraso.com.br",
  },
  {
    id: "barbearia",
    name: "Barbearia André",
    image: "/image-1.png",
    imageAlt: {
      pt: "Site da Barbearia André exibido em um celular",
      en: "Barbearia André website shown on a mobile phone",
    },
    category: {
      pt: ["Negócio local", "Agendamento online"],
      en: ["Local business", "Online booking"],
    },
    description: {
      pt: "Site com identidade forte e agendamento online integrado, pensado para transformar visitas em horários marcados direto pelo celular.",
      en: "A website with strong branding and integrated online booking, built to turn visits into appointments straight from the phone.",
    },
    tech: ["React", "Supabase"],
    url: "https://andredelraso.com.br",
  },
];
