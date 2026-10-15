export const SITE_CONFIG = {
  name: "UNOVIX",
  slogan: "Más tecnología. Más posibilidades.",
  description:
    "Tienda oficial UNOVIX. Tabletas, celulares, accesorios y tecnología para México.",
  domain: "https://www.umiiomx.com",
  contact: {
    whatsappNumber: "525624732141",
    whatsappMessage:
      "¡Hola! Vi su página de UNOVIX by UmiioMx y me gustaría recibir información sobre sus productos.",
    email: "umiiomx@gmail.com",
  },
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    mercadoLibre: "",
  },
} as const;

export function getWhatsAppUrl(message?: string) {
  const text = message ?? SITE_CONFIG.contact.whatsappMessage;
  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

