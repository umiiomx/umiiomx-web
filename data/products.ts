export type ProductStatus =
  | "active"
  | "low-stock"
  | "discontinued"
  | "coming-soon";

export type Product = {
  id: string;
  name: string;
  brand: string;
  model: string;
  image: string;
  gallery?: string[];

  category: string;
  badge: string;
  description: string;
  features: string[];

  wholesalePrice: number;
  retailPrice?: number;
  discountPrice?: number;
  discountActive: boolean;

  priceLabel: string;
  whatsapp: string;

  year: number;
  stock: number;
  status: ProductStatus;
  lifeCycle: "seasonal" | "permanent";
  replacementProductId?: string;

  featured: boolean;
};

export const products: Product[] = [
  {
    id: "s26-ultra",
    name: "Tablet S26 Ultra",
    brand: "Umiio",
    model: "S26 Ultra",
    image: "/products/s26-ultra.png",
    category: "Tablet",
    badge: "Modelo actual",
    description:
      "Tablet Android 15 con pantalla de 10.1 pulgadas, ranura SIM y accesorios incluidos.",
    features: [
      "16 GB RAM",
      "1 TB almacenamiento",
      "Android 15",
      "Pantalla 10.1 pulgadas",
      "Ranura SIM",
      "Incluye accesorios",
    ],
    wholesalePrice: 1350,
    retailPrice: 1699,
    discountPrice: 0,
    discountActive: false,
    priceLabel: "$1,350 mayoreo",
    whatsapp: "5624732141",
    year: 2026,
    stock: 25,
    status: "active",
    lifeCycle: "seasonal",
    featured: true,
  },
  {
    id: "s25-ultra",
    name: "Tablet S25 Ultra",
    brand: "Umiio",
    model: "S25 Ultra",
    image: "/products/s25-ultra.png",
    category: "Tablet",
    badge: "Últimas piezas",
    description:
      "Tablet modelo anterior disponible hasta agotar existencias.",
    features: [
      "16 GB RAM",
      "256 GB almacenamiento",
      "Pantalla 10.1 pulgadas",
      "Ranura SIM",
      "Incluye accesorios",
    ],
    wholesalePrice: 1280,
    retailPrice: 1599,
    discountPrice: 0,
    discountActive: false,
    priceLabel: "$1,280 mayoreo",
    whatsapp: "5624732141",
    year: 2025,
    stock: 12,
    status: "low-stock",
    lifeCycle: "seasonal",
    replacementProductId: "s26-ultra",
    featured: true,
  },
  {
    id: "jabonera-jack",
    name: "Jabonera Jack",
    brand: "Umiio",
    model: "Jack",
    image: "/products/jabonera-jack.png",
    category: "Hogar",
    badge: "Nuevo",
    description:
      "Jabonera dispensadora con diseño decorativo para baño o cocina.",
    features: [
      "Diseño decorativo",
      "Dispensador manual",
      "Ideal para baño o cocina",
      "Fácil de rellenar",
    ],
    wholesalePrice: 0,
    retailPrice: 0,
    discountPrice: 0,
    discountActive: false,
    priceLabel: "Consulta precio",
    whatsapp: "5624732141",
    year: 2026,
    stock: 40,
    status: "active",
    lifeCycle: "seasonal",
    featured: true,
  },
];