"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/* -------- SCROLL REVEAL -------- */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShow(true),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacy");
  const sections = Array.isArray(t.raw("sections")) ? t.raw("sections") : [];

  return (
    <main
      aria-labelledby="policy-heading"
      className="mx-auto max-w-5xl px-4 sm:px-6 py-12 sm:py-14 mb-10"
    >
      {/* JUDUL — LEBIH TIPIS & TIDAK TERLALU BESAR */}
      <Reveal>
        <h1
          id="policy-heading"
          className="
              text-center
              font-minion-pro
              text-[#800000]
              uppercase
              tracking-wide
              font-normal
              text-3xl
              sm:text-4xl
              md:text-5xl
            "
        >
          {t("title")}
        </h1>
      </Reveal>

      {/* KONTEN — JARAK DIPERKETAT */}
      <div className="mt-12 space-y-8 sm:space-y-10">
        {sections.map((s, i) => (
          <Reveal key={i} delay={i * 90}>
            <article id={`s${s.num}`} className="space-y-1">
              {/* SUBJUDUL */}
              <h2 className="font-minion-pro text-[#800000] uppercase text-lg sm:text-xl tracking-wide flex items-center gap-3 leading-none">
                {/* NUMBER */}
                <span className="font-poppins font-semibold tabular-nums">
                  {s.num}
                </span>

                {/* DASH */}
                <span className="flex items-center justify-center">
                  <span className="block h-[2px] w-4 bg-[#800000] rounded-full" />
                </span>

                {/* TITLE — MEDIUM */}
                <span className="font-minion-pro font-medium">{s.title}</span>
              </h2>

              {s.intro && (
                <p className="font-poppins text-[#800000]/90 text-sm sm:text-base leading-7">
                  {s.intro}
                </p>
              )}

              {/* PARAGRAF */}
              {Array.isArray(s.paragraphs) &&
                s.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="font-poppins text-[#800000]/90 text-sm sm:text-base leading-7"
                  >
                    {p}
                  </p>
                ))}

              {/* LIST 1 */}
              {Array.isArray(s.list) && s.list.length > 0 && (
                <ul className="list-disc pl-5 font-poppins text-[#800000]/90 text-sm sm:text-base leading-7 ml-3 space-y-0">
                  {s.list.map((li, k) => (
                    <li key={k}>{li}</li>
                  ))}
                </ul>
              )}

              {/* SUB KECIL */}
              {s.sub && (
                <p className="font-poppins text-[#800000]/90 text-sm sm:text-base leading-7 pt-1">
                  {s.sub}
                </p>
              )}

              {/* LIST 2 */}
              {Array.isArray(s.list2) && s.list2.length > 0 && (
                <ul className="list-disc pl-5 font-poppins text-[#800000]/90 text-sm sm:text-base leading-7 ml-3 space-y-0">
                  {s.list2.map((li, k) => (
                    <li key={k}>{li}</li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ))}
      </div>
    </main>
  );
}
