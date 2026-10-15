import Image from "next/image";
export default function BrandLogo({ footer = false }: { footer?: boolean }) {
  return <span className={"brand-logo " + (footer ? "brand-logo-footer" : "")}><Image src="/brand/unovix-by-umiiomx.png" alt="UNOVIX by UmiioMx" width={1760} height={876} priority={!footer} className="brand-logo-image" /></span>;
}
