"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Iniciando sistema de saúde",
  "Conectando 13 lojas em Campo Grande",
  "Quem tem São Leopoldo, tem saúde",
];

const SLOT_MS = 900;
const CHAR_MS = 22;

export function IntroSplash() {
  const [visible, setVisible] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("dsl-intro-seen")) return;
    setVisible(true);
  }, []);

  useEffect(() => {
    if (!visible) return;

    const phrase = PHRASES[phraseIndex];
    let i = 0;
    setTyped("");
    const typeId = setInterval(() => {
      i++;
      setTyped(phrase.slice(0, i));
      if (i >= phrase.length) clearInterval(typeId);
    }, CHAR_MS);

    const advanceId = setTimeout(() => {
      if (phraseIndex < PHRASES.length - 1) {
        setPhraseIndex((p) => p + 1);
      } else {
        setFading(true);
        setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("dsl-intro-seen", "1");
        }, 400);
      }
    }, SLOT_MS);

    return () => {
      clearInterval(typeId);
      clearTimeout(advanceId);
    };
  }, [phraseIndex, visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-brand-green-dark transition-opacity duration-[400ms] ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand-yellow/70">
          Drogaria São Leopoldo
        </p>
        <p className="min-h-[1.75rem] font-mono text-lg text-white sm:text-xl">
          {typed}
          <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-brand-yellow align-middle" />
        </p>
      </div>
    </div>
  );
}
