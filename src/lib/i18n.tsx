import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "pt" | "en";

const STORAGE_KEY = "adr_lang";

export const dict = {
  pt: {
    htmlLang: "pt-BR",
    nav: {
      home: "Início",
      projects: "Projetos",
      services: "Serviços",
      about: "Sobre",
      contact: "Contato",
      quote: "Solicitar orçamento",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
    },
    hero: {
      badge: "Seu novo site em até 7 dias.",
      title: "Sites profissionais que transformam visitas em clientes.",
      subtitle:
        "Desenvolvo sites modernos, rápidos e responsivos para empresas que querem fortalecer sua presença digital e gerar novas oportunidades.",
      complement:
        "Do design ao desenvolvimento, entrego seu site pronto para o seu negócio.",
      ctaPrimary: "Solicite um orçamento",
      ctaSecondary: "Conheça meus projetos",
    },
    projects: {
      title: "Projetos selecionados",
      subtitle:
        "Alguns dos projetos que desenvolvi para transformar ideias e negócios em experiências digitais profissionais.",
      cta: "Ver projeto ao vivo",
    },
    services: {
      title: "O que eu faço",
      subtitle:
        "Soluções digitais desenvolvidas de acordo com as necessidades de cada negócio.",
      items: [
        {
          title: "Sites Institucionais",
          text: "Sites profissionais para apresentar sua empresa, serviços, diferenciais e formas de contato.",
        },
        {
          title: "Landing Pages",
          text: "Páginas desenvolvidas com foco em transformar visitantes em contatos, pedidos de orçamento ou vendas.",
        },
        {
          title: "Sites para Negócios Locais",
          text: "Sites para barbearias, clínicas, restaurantes, lojas, prestadores de serviços e empresas de diferentes segmentos.",
        },
        {
          title: "Sistemas e Integrações",
          text: "Formulários, sistemas de agendamento, integração com WhatsApp, áreas administrativas, bancos de dados e outras funcionalidades conforme a necessidade do projeto.",
        },
        {
          title: "Redesign de Sites",
          text: "Modernização de sites antigos, melhorando design, experiência mobile, organização das informações e navegação.",
        },
      ],
    },
    about: {
      label: "Sobre mim",
      title: "Muito além de um site bonito.",
      p1: "Meu nome é André Del Raso e desenvolvo sites profissionais para empresas de diferentes segmentos.",
      p2: "Cuido de todo o processo — planejamento, design, desenvolvimento front-end, integrações e publicação — para que você não precise se preocupar com a parte técnica.",
      p3: "Meu objetivo é simples: criar um site profissional, rápido e fácil de usar que represente a qualidade do seu negócio.",
      photoAlt: "Foto profissional de André Del Raso",
    },
    differentials: {
      label: "Diferenciais",
      items: [
        {
          title: "Entrega rápida",
          text: "Projetos entregues em até 7 dias, dependendo da complexidade.",
        },
        {
          title: "100% responsivo",
          text: "Seu site desenvolvido para funcionar perfeitamente em celular, tablet e computador.",
        },
        {
          title: "Design personalizado",
          text: "Cada projeto é desenvolvido de acordo com a identidade, objetivo e necessidade da empresa.",
        },
        {
          title: "Acompanhamento",
          text: "Suporte durante todo o desenvolvimento, desde a primeira ideia até a publicação.",
        },
      ],
    },
    process: {
      label: "Como funciona",
      title: "Do primeiro contato ao site publicado.",
      steps: [
        {
          n: "01",
          title: "Conversamos",
          text: "Entendo sua empresa, seus objetivos e o que você precisa.",
        },
        {
          n: "02",
          title: "Desenvolvo",
          text: "Transformo as informações em design e começo o desenvolvimento do projeto.",
        },
        {
          n: "03",
          title: "Você acompanha",
          text: "Apresento o projeto e realizamos os ajustes necessários.",
        },
        {
          n: "04",
          title: "Publicamos",
          text: "Configuro o domínio e colocamos seu novo site no ar.",
        },
      ],
    },
    finalCta: {
      title: "Sua empresa merece um site à altura do seu trabalho.",
      text: "Vamos transformar sua presença digital em algo profissional, moderno e feito para gerar novas oportunidades.",
      primary: "Quero criar meu site",
      secondary: "Falar pelo WhatsApp",
    },
    contact: {
      label: "Contato",
      title: "Vamos conversar sobre o seu projeto.",
      text: "Preencha o formulário e retorno com uma proposta. Se preferir, fale comigo direto pelo WhatsApp.",
      name: "Nome",
      company: "Empresa",
      email: "E-mail",
      phone: "WhatsApp / Telefone",
      type: "Tipo de projeto",
      message: "Mensagem",
      optional: "opcional",
      submit: "Solicitar orçamento",
      sending: "Enviando...",
      success: "Mensagem enviada. Retorno em breve!",
      whatsapp: "Falar pelo WhatsApp",
      typeOptions: [
        "Site profissional",
        "Landing Page",
        "Redesign",
        "Sistema/Integração",
        "Outro",
      ],
      errors: {
        name: "Informe seu nome.",
        email: "Informe um e-mail válido.",
        phone: "Informe um telefone válido.",
        type: "Selecione o tipo de projeto.",
        message: "Escreva uma breve mensagem.",
      },
    },
    footer: {
      nav: "Navegação",
      social: "Redes",
      rights: "© André Del Raso. Todos os direitos reservados.",
    },
    whatsappMessage:
      "Olá André! Vi seu portfólio e gostaria de conversar sobre a criação de um site para minha empresa.",
    whatsappAria: "Falar no WhatsApp",
  },

  en: {
    htmlLang: "en",
    nav: {
      home: "Home",
      projects: "Work",
      services: "Services",
      about: "About",
      contact: "Contact",
      quote: "Get a Quote",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      badge: "Your new website in as little as 7 days.",
      title: "Professional websites built to turn visitors into customers.",
      subtitle:
        "I design and develop modern, fast and mobile-friendly websites for businesses looking to build a stronger online presence and generate new opportunities.",
      complement: "From design to launch, I take care of the entire process.",
      ctaPrimary: "Get a Quote",
      ctaSecondary: "View My Work",
    },
    projects: {
      title: "Selected work",
      subtitle:
        "A few of the projects I've built to turn ideas and businesses into professional digital experiences.",
      cta: "View live project",
    },
    services: {
      title: "What I do",
      subtitle: "Digital solutions built around what each business actually needs.",
      items: [
        {
          title: "Business Websites",
          text: "Professional websites to present your company, services, strengths and contact details.",
        },
        {
          title: "Landing Pages",
          text: "Pages built to turn visitors into leads, quote requests or sales.",
        },
        {
          title: "Local Business Websites",
          text: "Websites for barbershops, clinics, restaurants, stores, service providers and businesses of all kinds.",
        },
        {
          title: "Systems & Integrations",
          text: "Forms, booking systems, WhatsApp integration, admin areas, databases and any other feature your project needs.",
        },
        {
          title: "Website Redesign",
          text: "Modernizing outdated websites — better design, mobile experience, content structure and navigation.",
        },
      ],
    },
    about: {
      label: "About",
      title: "More than just a good-looking website.",
      p1: "My name is André Del Raso and I build professional websites for businesses across different industries.",
      p2: "I handle the entire process — planning, design, front-end development, integrations and launch — so you never have to worry about the technical side.",
      p3: "My goal is simple: to deliver a fast, professional and easy-to-use website that reflects the quality of your business.",
      photoAlt: "Professional photo of André Del Raso",
    },
    differentials: {
      label: "Why work with me",
      items: [
        {
          title: "Fast delivery",
          text: "Projects delivered in as little as 7 days, depending on scope.",
        },
        {
          title: "Fully responsive",
          text: "Your website built to work flawlessly on phones, tablets and desktops.",
        },
        {
          title: "Custom design",
          text: "Every project is designed around your brand, your goals and your business needs.",
        },
        {
          title: "Direct support",
          text: "You work directly with me, from the first idea to the day your site goes live.",
        },
      ],
    },
    process: {
      label: "How it works",
      title: "From first conversation to launch.",
      steps: [
        {
          n: "01",
          title: "We talk",
          text: "I get to know your business, your goals and what you need.",
        },
        {
          n: "02",
          title: "I build",
          text: "I turn that into design and start developing your project.",
        },
        {
          n: "03",
          title: "You review",
          text: "I present the project and we refine it together.",
        },
        {
          n: "04",
          title: "We launch",
          text: "I set up the domain and put your new website online.",
        },
      ],
    },
    finalCta: {
      title: "Your business deserves a website that matches your work.",
      text: "Let's turn your online presence into something professional, modern and built to bring in new opportunities.",
      primary: "Start my project",
      secondary: "Message on WhatsApp",
    },
    contact: {
      label: "Contact",
      title: "Let's talk about your project.",
      text: "Fill out the form and I'll get back to you with a proposal. Prefer something quicker? Message me on WhatsApp.",
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone / WhatsApp",
      type: "Project type",
      message: "Message",
      optional: "optional",
      submit: "Get a Quote",
      sending: "Sending...",
      success: "Message sent. I'll get back to you shortly!",
      whatsapp: "Message on WhatsApp",
      typeOptions: [
        "Business website",
        "Landing Page",
        "Redesign",
        "System / Integration",
        "Other",
      ],
      errors: {
        name: "Please enter your name.",
        email: "Please enter a valid email.",
        phone: "Please enter a valid phone number.",
        type: "Please select a project type.",
        message: "Please write a short message.",
      },
    },
    footer: {
      nav: "Navigation",
      social: "Social",
      rights: "© André Del Raso. All rights reserved.",
    },
    whatsappMessage:
      "Hi André! I came across your portfolio and I'd like to talk about building a website for my business.",
    whatsappAria: "Chat on WhatsApp",
  },
} as const;

export type Dict = (typeof dict)["pt"];

type I18nValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const I18nContext = createContext<I18nValue | null>(null);

function detectLang(): Lang {
  if (typeof window === "undefined") return "pt";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    /* storage indisponível */
  }
  const nav = window.navigator.language?.toLowerCase() ?? "pt";
  return nav.startsWith("pt") ? "pt" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt");

  useEffect(() => {
    setLangState(detectLang());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = dict[lang].htmlLang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* storage indisponível */
    }
  }, []);

  const value = useMemo<I18nValue>(
    () => ({ lang, setLang, t: dict[lang] as Dict }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n precisa estar dentro de I18nProvider");
  return ctx;
}
