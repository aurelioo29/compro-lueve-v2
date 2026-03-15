"use client";

import React from "react";
import Image from "next/image";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useTranslations } from "next-intl";

const SLIDES = [
  {
    src: "/images/hero/home-page-1.jpg",
    alt: "Wedding rings on paper background",
    focal: "[object-position:70%_40%]",
    fit: "cover",
    flipX: true,
  },
  {
    src: "/images/hero/home-page-2.png",
    alt: "Wedding rings on paper background",
    focal: "[object-position:60%_55%]",
    fit: "cover",
  },
  {
    src: "/images/hero/home-page-3.png",
    alt: "Wedding rings on paper background",
    focal: "[object-position:70%_40%]",
    fit: "cover",
  },
];

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      aria-label="Hero vertical slider"
      className="-mt-[88px] md:-mt-[128px] relative"
    >
      {/* ===== SLIDER (background) ===== */}
      <Splide
        options={{
          type: "loop",
          direction: "ttb",
          height: "calc(100dvh + 80px)",
          autoplay: true,
          interval: 3000,
          speed: 500,
          pauseOnHover: true,
          pauseOnFocus: true,
          arrows: false,
          pagination: true,
          breakpoints: {
            1024: {
              direction: "ltr",
              height: "80vh",
            },
          },
        }}
      >
        {SLIDES.map((s, i) => (
          <SplideSlide key={s.src}>
            <div className="relative h-full">
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={[
                  // FIT:
                  // - kalau slide minta "contain" → selalu contain
                  // - kalau "cover" → mobile contain, md+ cover
                  s.fit === "contain"
                    ? "object-contain bg-white"
                    : "object-contain md:object-cover bg-white",

                  // POSITION (baru kepakai di md+ supaya nggak ganggu mobile)
                  "object-center",
                  s.focal ? `md:${s.focal}` : "",

                  // FLIP X hanya di md+
                  s.flipX ? "md:-scale-x-100" : "",

                  "will-change-transform",
                ].join(" ")}
              />

              {/* gradien kiri: hanya desktop, biar mobile nggak ngebutakin foto */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[52vw] md:w-[44vw] bg-gradient-to-r from-white/85 to-transparent hidden md:block" />

              {/* gradien bawah: tetap, buat teks mobile */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/85 to-transparent" />
            </div>
          </SplideSlide>
        ))}
      </Splide>

      {/* ===== OVERLAY TEXT (satu copy untuk semua slide) ===== */}
      {/* Desktop / Large */}
      <div className="hidden md:block pointer-events-none absolute inset-0">
        {/* Headline kiri — dinaikkan & baris ke-2 menjorok */}
        <div className="absolute left-10 lg:left-20 top-[30%] -translate-y-1/2 max-w-[40rem]">
          <h1 className="pointer-events-auto font-minion-pro text-[#800000] leading-[0.95] tracking-[0.02em] text-[clamp(2.25rem,4vw,3.25rem)] lg:text-[clamp(2.75rem,4.2vw,4rem)]">
            {t("headlineLine1")}
            <br />
            <span className="block pl-6 lg:pl-56">{t("headlineLine2")}</span>
          </h1>
        </div>

        {/* Paragraf kanan bawah */}
        <p
          className="absolute right-10 lg:right-20 bottom-8 max-w-[680px]
             text-right text-[#800000] font-poppins
             text-[clamp(0.9rem,1.2vw,1.05rem)] leading-relaxed
             pointer-events-auto"
          dangerouslySetInnerHTML={{
            __html: t.raw ? t.raw("desc") : String(t("desc")),
          }}
        />
      </div>

      {/* Mobile / Tablet */}
      <div className="md:hidden">
        <div className="px-4 pt-6 pb-8 bg-white space-y-3">
          <h1 className="font-minion-pro text-[#800000] leading-tight text-[clamp(1.6rem,6vw,2.1rem)]">
            {t("headlineLine1")}
            <br />
            <span className="block">{t("headlineLine2")}</span>
          </h1>

          <p
            className="text-[#800000]/95 text-[clamp(0.9rem,3.6vw,1rem)] font-poppins leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: t.raw ? t.raw("desc") : String(t("desc")),
            }}
          />
        </div>
      </div>
    </section>
  );
}
