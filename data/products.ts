export type ProductStatus =
  | "active"
  | "low-stock"
  | "discontinued"
  | "coming-soon";

export type Product = {
  id: string;
  name: string;
  image: string;
  priceLabel: string;
  category: string;
  badge: string;
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
    image: "/products/s26-ultra.png",
    priceLabel: "$1,350 mayoreo",
    category: "Tablet",
    badge: "Modelo actual",
    year: 2026,
    stock: 25,
    status: "active",
    lifeCycle: "seasonal",
    replacementProductId: "",
    featured: true,
  },
  {
    id: "s25-ultra",
    name: "Tablet S25 Ultra",
    image: "/products/s25-ultra.png",
    priceLabel: "$1,280 mayoreo",
    category: "Tablet",
    badge: "Últimas piezas",
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
  image: "/products/jabonera-jack.png",
  priceLabel: "Consulta precio",
  category: "Hogar",
  badge: "Nuevo",
  year: 2026,
  stock: 40,
  status: "active",
  lifeCycle: "seasonal",
  featured: true,
}
];