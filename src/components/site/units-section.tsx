"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Navigation, Search } from "lucide-react";
import { lojas } from "@/data/lojas";
import { cn } from "@/lib/utils";
import { useCountUp } from "@/lib/use-count-up";

export function UnitsSection() {
  const [query, setQuery] = useState("");
  const [somente24h, setSomente24h] = useState(false);

  const bairrosAtendidos = useMemo(() => new Set(lojas.map((l) => l.bairro)).size, []);
  const loja24h = useMemo(() => lojas.find((l) => l.h24), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lojas.filter((loja) => {
      if (somente24h && !loja.h24) return false;
      if (!q) return true;
      return (
        loja.bairro.toLowerCase().includes(q) ||
        loja.endereco.toLowerCase().includes(q) ||
        loja.numero.includes(q)
      );
    });
  }, [query, somente24h]);

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 pt-4 sm:px-6 sm:pb-20 sm:pt-6">
      <div className="mb-6 flex flex-wrap items-center justify-center gap-4 sm:mb-8 sm:gap-6">
        <CountStat target={lojas.length} label="lojas" />
        <CountStat target={bairrosAtendidos} label="bairros" />
        {loja24h && <Stat value={`Loja ${loja24h.bairro}`} label="24 horas" />}
      </div>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Encontre sua loja</p>
          <h2
            className="mt-2 text-2xl font-extrabold text-foreground sm:text-3xl"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Escolha a mais perto de você
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSomente24h((v) => !v)}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-bold transition-colors",
              somente24h
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            Somente 24h
          </button>

          <div className="flex w-full max-w-xs items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm focus-within:border-primary sm:w-auto">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Buscar por bairro ou endereço..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted-foreground">
          Nenhuma unidade encontrada com esse termo.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((loja, i) => (
            <motion.div
              key={loja.numero}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 6) * 0.06, ease: "easeOut" }}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-base font-extrabold text-[color:var(--brand-green-dark)]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {loja.numero}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-foreground">{loja.bairro}</h3>
                    <p className="text-xs font-bold text-primary">Loja {loja.numero}</p>
                  </div>
                </div>
                {loja.h24 && (
                  <span className="rounded-lg bg-accent px-2.5 py-1 text-[11px] font-extrabold text-[color:var(--brand-green-dark)]">
                    24h
                  </span>
                )}
              </div>

              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>{loja.endereco}</span>
              </div>

              <p className="text-sm text-muted-foreground">{loja.telefone}</p>

              <div className="mt-auto flex gap-2 border-t border-border pt-4">
                <a
                  href={`https://wa.me/${loja.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-xs font-bold text-primary-foreground transition-colors hover:bg-[#1f4d23]"
                >
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                  WhatsApp
                </a>
                <a
                  href={loja.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent py-2.5 text-xs font-bold text-[color:var(--brand-green-dark)] transition-colors hover:bg-accent/70"
                >
                  <Navigation className="h-3.5 w-3.5" aria-hidden />
                  Localização
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-35 rounded-2xl border border-border bg-card px-6 py-5 text-center shadow-sm sm:min-w-40 sm:px-8 sm:py-6">
      <div
        className="text-2xl font-extrabold text-[color:var(--brand-green-dark)] sm:text-3xl"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function CountStat({ target, label }: { target: number; label: string }) {
  const { ref, value } = useCountUp(target);
  return (
    <div
      ref={ref}
      className="min-w-35 rounded-2xl border border-border bg-card px-6 py-5 text-center shadow-sm sm:min-w-40 sm:px-8 sm:py-6"
    >
      <div
        className="text-2xl font-extrabold tabular-nums text-[color:var(--brand-green-dark)] sm:text-3xl"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
