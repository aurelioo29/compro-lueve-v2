"use client";

import React, { useEffect } from "react";
import { Link } from "@/lib/navigation";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale();

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <section
      aria-labelledby="about-heading"
      className="py-12 md:py-24 bg-white overflow-x-hidden"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6">
        {/* 2 kolom besar di desktop */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] items-stretch lg:ml-20">
          {/* ==== LEFT COLUMN ==== */}
          <div className="space-y-8 lg:space-y-10" data-aos="fade-up">
            {/* Heading + body */}
            <div>
              <h2
                id="about-heading"
                className="font-minion-pro text-[#800000] text-4xl md:text-5xl lg:text-6xl leading-tight"
              >
                {t("heading")}
              </h2>

              <p className="mt-4 text-[#800000] font-poppins text-sm md:text-base lg:text-[17px] leading-7 md:leading-8 max-w-4xl">
                {t.rich("body", {
                  brand: (c) => <span className="font-semibold">{c}</span>,
                  wedding: (c) => <span className="font-semibold">{c}</span>,
                  engagement: (c) => <span className="font-semibold">{c}</span>,
                })}
              </p>

              <div className="mt-6 lg:mt-[85px]">
                <div className="inline-flex items-center border-b-[3px] border-[#800000] pb-1.5 lg:w-3xl">
                  <Link
                    href="/about"
                    locale={locale}
                    className="font-poppins text-[#800000] text-xs md:text-sm lg:text-base hover:underline underline-offset-4 font-semibold"
                  >
                    {t("cta")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Big image bawah kiri */}
            <div
              className="
    relative w-full
    aspect-[16/9] md:aspect-[18/11]
    lg:aspect-[4/2.6]
    overflow-hidden lg:rounded-tl-[260px]
  "
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Image
                src="/images/about/bottom-about.svg"
                alt={t("bottomLeftAlt")}
                fill
                sizes="(min-width:1024px) 900px, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* ==== RIGHT COLUMN (2 foto vertikal) ==== */}
          <div className="flex flex-col gap-6 lg:gap-8 items-stretch lg:items-start lg:h-full lg:justify-center">
            {/* Top right image – lebih tinggi */}
            <div
              className="relative w-full max-w-full lg:max-w-[420px] aspect-[4/4] overflow-hidden lg:rounded-tr-[150px]"
              data-aos="fade-left"
              data-aos-delay="80"
            >
              <Image
                src="/images/about/right-top-about.svg"
                alt={t("topRightAlt")}
                fill
                sizes="(min-width:1024px) 420px, 100vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Bottom right image – lebih pendek tapi LEBAR SAMA */}
            <div
              className="
    relative w-full max-w-full lg:max-w-[420px]
    aspect-[3/3]
    lg:aspect-[3/3]
    overflow-hidden lg:rounded-br-[150px]
  "
              data-aos="fade-right"
              data-aos-delay="80"
            >
              <Image
                src="/images/about/right-bottom-about.svg"
                alt={t("bottomRightAlt")}
                fill
                sizes="(min-width:1024px) 420px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
