"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
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

export default function TermsConditionsPage() {
  const t = useTranslations("terms");
  const sections = Array.isArray(t.raw("sections")) ? t.raw("sections") : [];

  return (
    <section className="-mt-[100px] md:-mt-[120px] relative overflow-x-clip">
      {/* HERO BACKGROUND */}
      <div className="h-[20svh] md:h-[20dvh] overflow-hidden">
        <Image
          src="/images/term-conditions-bg.svg"
          alt={t("bgAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 pb-24 md:pb-36 md:mt-10">
        {/* ✅ TITLE */}
        <Reveal>
          <h1
            className="
              text-center
              font-minion-pro
              text-[#800000]
              uppercase
              tracking-wide
              font-normal
              text-3xl
              sm:text-4xl
              md:text-7xl
            "
          >
            {t("title")}
          </h1>
        </Reveal>

        {/* ✅ GLASS CARD SECTION */}
        <div className="mt-10 md:mt-16">
          <ol
            className="
              space-y-7 md:space-y-9
              rounded-[40px] md:rounded-[72px]
              bg-white/25 backdrop-blur-md
              shadow-xl
              p-6 sm:p-10 md:p-14
            "
          >
            {sections.map((sec, i) => (
              <Reveal key={i} delay={i * 90}>
                <li className="relative">
                  <div
                    className="grid grid-cols-[auto_3rem_1fr] items-center mb-2"
                  >
                    {/* NUMBER */}
                    <span className="font-poppins font-bold tabular-nums text-[#CEA660] text-[clamp(1.2rem,2vw+1rem,1.75rem)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* DASH — TRUE CENTER CELL */}
                    <span className="flex justify-center">
                      <span className="block h-[2px] w-4 bg-[#800000] rounded-full" />
                    </span>

                    {/* TITLE */}
                    <h3 className="font-minion-pro text-[#800000] uppercase font-medium tracking-wide text-[clamp(1.05rem,1.1vw+0.9rem,1.4rem)]">
                      {sec.title}
                    </h3>
                  </div>

                  {/* ✅ CONTENT */}
                  <div className="space-y-2">
                    {sec.intro && (
                      <p className="font-poppins text-sm md:text-base leading-7 text-[#800000]/90">
                        {sec.intro}
                      </p>
                    )}

                    {Array.isArray(sec.list) && sec.list.length > 0 && (
                      <ul className="list-disc pl-6 font-poppins text-sm md:text-base leading-7 text-[#800000]/90 space-y-1">
                        {sec.list.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}

                    {sec.sub && (
                      <p className="font-poppins text-sm md:text-base text-[#800000] pt-1">
                        <span className="font-semibold">{sec.sub}</span>
                      </p>
                    )}

                    {Array.isArray(sec.list2) && sec.list2.length > 0 && (
                      <ul className="list-disc pl-6 font-poppins text-sm md:text-base leading-7 text-[#800000]/90 space-y-1">
                        {sec.list2.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}

                    {sec.note && (
                      <p className="font-poppins text-sm md:text-base text-[#800000]/80 pt-1">
                        {sec.note}
                      </p>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
