import type { Specification } from "@/lib/product-attributes";
export type Product = {
  name: string;
  slug: string;
  category: string;
  description: string;
  gradient: string;
  price?: number | null;
  stock?: number;
  images?: string[];
  active?: boolean;
  featured?: boolean;
  specifications?: Specification[];
};

export const products: Product[] = [
  {
    "slug": "s26-ultra",
    "name": "Tablet S26 Ultra",
    "category": "Tabletas",
    "description": "Tablet Android 15 con pantalla de 10.1 pulgadas, ranura SIM y accesorios incluidos.",
    "gradient": "from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800",
    "price": 1699,
    "stock": 25,
    "images": [
      "/products/s26-ultra.png"
    ],
    "active": true,
    "featured": true,
    "specifications": [
      {
        "name": "Marca",
        "value": "Umiio"
      },
      {
        "name": "Modelo",
        "value": "S26 Ultra"
      }
    ]
  },
  {
    "slug": "s25-ultra",
    "name": "Tablet S25 Ultra",
    "category": "Tabletas",
    "description": "Tablet modelo anterior disponible hasta agotar existencias.",
    "gradient": "from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800",
    "price": 1599,
    "stock": 12,
    "images": [
      "/products/s25-ultra.png"
    ],
    "active": true,
    "featured": true,
    "specifications": [
      {
        "name": "Marca",
        "value": "Umiio"
      },
      {
        "name": "Modelo",
        "value": "S25 Ultra"
      }
    ]
  },
  {
    "slug": "jabonera-jack",
    "name": "Jabonera Jack",
    "category": "Hogar",
    "description": "Jabonera dispensadora con diseño decorativo para baño o cocina.",
    "gradient": "from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800",
    "price": null,
    "stock": 40,
    "images": [
      "/products/jabonera-jack.png"
    ],
    "active": true,
    "featured": true,
    "specifications": [
      {
        "name": "Marca",
        "value": "Umiio"
      },
      {
        "name": "Modelo",
        "value": "Jack"
      }
    ]
  },
  {
    "name": "Rikkai S25",
    "slug": "rikkai-s25",
    "category": "Tabletas",
    "description": "Tableta de 10.1 pulgadas con accesorios y conectividad para trabajo, estudio y entretenimiento.",
    "gradient": "from-purple-200 via-fuchsia-100 to-violet-200 dark:from-purple-950 dark:via-zinc-950 dark:to-violet-950"
  },
  {
    "name": "Rikkai A9+",
    "slug": "rikkai-a9-plus",
    "category": "Tabletas",
    "description": "Una opción práctica con diseño moderno, accesorios completos y funciones para el uso diario.",
    "gradient": "from-emerald-200 via-zinc-100 to-purple-200 dark:from-emerald-950 dark:via-zinc-950 dark:to-purple-950"
  },
  {
    "name": "Asumi i17 Plus",
    "slug": "asumi-i17-plus",
    "category": "Tabletas",
    "description": "Pantalla amplia, almacenamiento generoso y conectividad para distintos escenarios de uso.",
    "gradient": "from-blue-200 via-purple-100 to-fuchsia-200 dark:from-blue-950 dark:via-purple-950 dark:to-fuchsia-950"
  },
  {
    "name": "PZ886",
    "slug": "pz886",
    "category": "Celulares",
    "description": "Smartphone compacto pensado para llamadas, mensajería y funciones esenciales.",
    "gradient": "from-orange-200 via-zinc-100 to-purple-200 dark:from-orange-950 dark:via-zinc-950 dark:to-purple-950"
  },
  {
    "name": "Power Bank",
    "slug": "power-bank",
    "category": "Accesorios",
    "description": "Energía portátil para mantener tus dispositivos disponibles durante el día.",
    "gradient": "from-zinc-200 via-purple-100 to-pink-200 dark:from-zinc-900 dark:via-purple-950 dark:to-pink-950"
  },
  {
    "name": "Cable UM-L42",
    "slug": "cable-um-l42",
    "category": "Cables",
    "description": "Familia de cables para distintas conexiones y necesidades de carga.",
    "gradient": "from-sky-200 via-zinc-100 to-violet-200 dark:from-sky-950 dark:via-zinc-950 dark:to-violet-950"
  }
];
