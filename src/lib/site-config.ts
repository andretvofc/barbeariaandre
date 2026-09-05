/**
 * Configurações centrais do site.
 * Altere aqui número de WhatsApp, redes sociais e domínio.
 */

export const siteConfig = {
  name: "André Del Raso",
  role: "Web Developer",
  domain: "andredelraso.com.br",
  url: "https://andredelraso.com.br",
  email: "contato@andredelraso.com.br",

  /** Número no formato internacional, apenas dígitos. Ex.: 5511999999999 */
  whatsapp: "5500000000000",

  social: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/in/",
    github: "https://github.com/",
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}
