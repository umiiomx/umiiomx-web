import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./storefront.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UNOVIX | Más tecnología. Más posibilidades.",
  description:
    "Tienda oficial UNOVIX. Tabletas, celulares, accesorios y tecnología para México.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
