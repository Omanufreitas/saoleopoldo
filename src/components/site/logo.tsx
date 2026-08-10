import Image from "next/image";
import { siteConfig } from "@/data/lojas";

export function Logo({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <Image
      src={siteConfig.logoUrl}
      alt={siteConfig.nome}
      width={220}
      height={70}
      priority
      className={`h-10 w-auto object-contain ${invert ? "brightness-0 invert" : ""} ${className ?? ""}`}
    />
  );
}
