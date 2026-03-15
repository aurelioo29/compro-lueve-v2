"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CustomRingSpotlight() {
  const t = useTranslations("customRingSpotlight");

  return (
    <section className="relative -mt-[96px] md:-mt-[120px] overflow-x-clip">
      {/* FULL-BLEED background, tinggi = viewport - navbar */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen md:w-[100svw] overflow-hidden min-h-[calc(100svh-96px)] md:min-h-[calc(100svh-120px)]">
        <Image
          src="/images/custom/bg-hero-spotlight.png"
          alt=""
          fill
          priority
          sizes="100vw"
        />

        {/* Konten di atas BG */}
        <div className="relative mx-auto max-w-7xl px-6 sm:px-6 h-full">
          <div className="grid h-full grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
            {/* TEKS */}
            <div className="mt-40 md:mt-48 order-1 lg:order-1 lg:col-span-6 flex flex-col items-center lg:items-start tracking-widest">
              <p className="text-[#800000]/90 font-minion-pro text-3xl md:text-4xl max-w-[48ch] text-center lg:text-left mx-auto lg:mx-0 leading-10 md:leading-[2.75rem]">
                {t.rich("body", {
                  brand: (chunks) => (
                    <span className="font-bold">{chunks}</span>
                  ),
                })}
              </p>

              <div className="mt-6 md:mt-10 w-full flex justify-center lg:justify-start">
                <Link
                  href="#the-lueve-privilege"
                  className="group inline-flex items-center gap-2 md:gap-3 font-poppins text-[#800000] text-base md:text-lg hover:underline underline-offset-4 px-4 py-2.5 rounded-xl border border-transparent bg-white/90 shadow-md hover:shadow-lg transition-all"
                  aria-label={t("cta.label")}
                >
                  {t("cta.label")}
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* GAMBAR KANAN — tidak di-zoom, tidak ditambah border */}
            <div className="order-2 md:mt-56 lg:order-2 lg:col-span-6 flex justify-center lg:justify-end">
              {/* Pakai intrinsic sizing + width yang lebih kecil */}
              <Image
                src="/images/custom/hero-main.png"
                alt={t("image.alt")}
                width={420} // intrinsic lebih kecil sudah cukup
                height={525}
                priority
                sizes="(min-width:1280px) 380px, (min-width:1024px) 320px, 60vw"
                className="w-[250px] sm:w-[220px] md:w-[260px] lg:w-[320px] xl:w-[380px] h-auto select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Veil supaya navbar tetap kebaca saat bleed */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[96px] md:h-[120px] bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
