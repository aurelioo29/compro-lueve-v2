"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutBrand() {
  const t = useTranslations("aboutBrand");

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <section
      aria-labelledby="about-brand-heading"
      className="py-12 md:py-16 lg:py-20 px-5 md:px-0"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <h2
          id="about-brand-heading"
          className="text-center font-minion-pro text-[#800000] text-4xl md:text-5xl lg:text-6xl"
          data-aos="fade-up"
        >
          {t("title")}
        </h2>

        {/* Top: Left (title), Center (logos), Right (reg number) */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-2 items-center">
          {/* Left */}
          <div
            className="lg:col-span-3"
            data-aos="fade-right"
            data-aos-delay="80"
          >
            <div className="h-1 w-36 bg-[#E0C698] rounded-full mb-5" />
            <h3 className="font-minion-pro text-[#800000] text-6xl">
              {t("left.heading")}
            </h3>
            <p className="mt-3 font-poppins text-[#800000] text-lg">
              {t("left.subheading")}
            </p>
          </div>

          {/* Center (logos) */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-6 place-items-center">
              <div
                className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay="120"
              >
                <Image
                  src="/images/about-pages/about-lueve.svg"
                  alt={t("logos.wordmarkAlt")}
                  fill
                  sizes="(min-width:1024px) 220px, 200px"
                  className="object-contain"
                  priority
                />
              </div>
              <div
                className="relative w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay="220"
              >
                <Image
                  src="/images/about-pages/about-logo.svg"
                  alt={t("logos.markAlt")}
                  fill
                  sizes="(min-width:1024px) 220px, 200px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right */}
          <div
            className="lg:col-span-3"
            data-aos="fade-left"
            data-aos-delay="160"
          >
            <p className="text-center font-poppins text-[#800000] text-xl">
              <span className="block">{t("reg.label")}</span>
              <span className="mt-1 inline-block tracking-wide">
                {t("reg.value")}
              </span>
            </p>
          </div>
        </div>

        {/* Bottom: Quote (left) + Body (right) */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <blockquote
            className="font-minion-pro text-[#800000] text-2xl md:text-3xl italic font-semibold"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            {t("quote")}
          </blockquote>

          <p
            className="font-poppins text-[#800000] text-lg leading-8 text-justify"
            data-aos="fade-up"
            data-aos-delay="160"
          >
            {t("body")}
          </p>
        </div>
      </div>
    </section>
  );
}
