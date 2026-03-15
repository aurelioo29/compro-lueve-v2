"use client";

import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { Link } from "@/lib/navigation";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function PillCard({ img, alt, title, caption, href }) {
  const t = useTranslations("discover");
  const locale = useLocale();

  return (
    <article
      className="group relative w-full"
      data-aos="fade-up"
      data-aos-offset="120"
    >
      <div className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[460px] min-h-[560px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[820px] rounded-[999px] backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,.25)] flex flex-col items-center text-center px-4 sm:px-6 pt-6 sm:pt-8 md:pt-10 pb-8 sm:pb-10 transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:[transform:perspective(1000px)_rotateX(-2deg)_rotateY(2deg)] hover:cursor-pointer">
        {/* Circle image */}
        <div className="relative w-72 h-72 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-xl transition-transform duration-700 group-hover:-translate-y-1 shrink-0">
          <Image
            src={img}
            alt={alt}
            fill
            sizes="(min-width:1024px) 320px, (min-width:768px) 256px, 224px"
            className="object-cover select-none"
            priority
          />
        </div>

        {/* Title wrapper with fixed height */}
        <div className="mt-6 sm:mt-8 md:mt-10 min-h-[88px] sm:min-h-[110px] md:min-h-[128px] flex items-center justify-center">
          <h3 className="font-quattro text-[#800000] text-4xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight">
            {title}
          </h3>
        </div>

        {/* Caption wrapper with fixed height */}
        {caption && (
          <div className="mt-4 min-h-[52px] sm:min-h-[60px] md:min-h-[72px] flex items-start justify-center">
            <p className="px-4 font-futura-dee text-[#800000]/85 text-xl sm:text-lg md:text-[20px] max-w-[240px] leading-relaxed text-center">
              {caption}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-6">
          <Link
            href={href}
            locale={locale}
            className="inline-flex items-center gap-1 rounded-full bg-[#E0C698] px-4 sm:px-5 py-2 font-futura-dee text-[#800000] text-sm sm:text-base md:text-lg transition-all duration-200 hover:shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E0C698]"
            aria-label={t("discover")}
          >
            {t("discover")}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
