import { Facebook, Instagram } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { siteConfig } from "@/data/lojas";

export function Footer() {
  return (
    <footer className="mt-16 bg-[color:var(--brand-green-dark)] text-white/70">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo className="mb-4" invert />
          <p className="mb-5 max-w-xs text-sm text-white/55">
            Referência em saúde, bem-estar e beleza em Campo Grande desde {siteConfig.anoFundacao}.
          </p>
          <div className="flex gap-2.5">
            <a
              href={siteConfig.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 transition-colors hover:bg-white/10"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-white">Contato</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li>{siteConfig.email}</li>
            <li>{siteConfig.telefonePrincipal}</li>
            <li>{siteConfig.endereco}</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-white">Institucional</h4>
          <ul className="space-y-2.5 text-sm text-white/60">
            <li>
              <a href="/quem-somos" className="transition-colors hover:text-white">
                Quem somos
              </a>
            </li>
            <li>
              <a href="/nossas-lojas" className="transition-colors hover:text-white">
                Nossas lojas
              </a>
            </li>
            <li>
              <a
                href={siteConfig.transparencia}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                Relatório de Transparência Salarial
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/40 sm:px-6">
        © {new Date().getFullYear()} Drogaria S.L. LTDA. Todos os direitos reservados. — CNPJ
        04.707.705/0001-02
      </div>
    </footer>
  );
}
