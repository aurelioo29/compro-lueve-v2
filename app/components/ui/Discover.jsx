"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";
import PillCard from "./Pillcard";

export default function Discover() {
  const t = useTranslations("discover");

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/discover/background-discover.svg"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="object-cover pointer-events-none select-none"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-28">
        {/* Title */}
        <div className="flex justify-center text-center" data-aos="fade-up">
          <div className="rounded-full px-5 py-3 sm:px-7 sm:py-4 backdrop-blur-md border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,.15)] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,.25)] hover:scale-[1.02]">
            <h2 className="font-minion-pro text-[#800000] uppercase text-3xl sm:text-4xl md:text-5xl lg:text-[75px] leading-none">
              {t("title")}
            </h2>
          </div>
        </div>

        {/* Cards */}
        <div
          className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 place-items-center"
          data-aos="fade-up"
          data-aos-delay="120"
        >
          <PillCard
            img="/images/discover/engagement-left-rings.svg"
            alt={t("engagement.alt")}
            title={t("engagement.title")}
            caption={t("engagement.caption")}
            href="/collection/engagement-rings"
          />

          <PillCard
            img="/images/discover/wedding-right-rings.svg"
            alt={t("wedding.alt")}
            title={t("wedding.title")}
            caption={t("wedding.caption")}
            href="/collection/wedding-rings"
          />
        </div>
      </div>
    </section>
  );
}
