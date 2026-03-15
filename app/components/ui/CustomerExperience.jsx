"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import AOS from "aos";
import "aos/dist/aos.css";

export default function CustomerExperience() {
  const t = useTranslations("experience");
  const slides = Array.isArray(t.raw("slides")) ? t.raw("slides") : [];

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <section
      aria-labelledby="exp-heading"
      className="py-12 md:py-16"
      id="customer-experience"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading baris atas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end">
          <div className="lg:col-span-7" data-aos="fade-up">
            <h2
              id="exp-heading"
              className="font-minion-pro text-[#800000] leading-none text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block">{t("heading.top")}</span>
              <span className="md:ml-12">{t("heading.bottom")}</span>
            </h2>
          </div>

          <p
            className="lg:col-span-5 text-[#800000] font-poppins text-sm md:text-base lg:text-lg text-right"
            data-aos="fade-up"
            data-aos-delay="120"
          >
            {t("tagline")}
          </p>
        </div>

        {/* Slider */}
        <Splide
          aria-label={t("ariaLabel")}
          className="mt-8 md:mt-32"
          options={{
            type: "loop",
            perPage: 1,
            autoplay: true,
            interval: 5500,
            speed: 700,
            pauseOnHover: true,
            pauseOnFocus: true,
            arrows: false,
            pagination: true,
            gap: "2rem",
            breakpoints: { 768: { gap: "1rem" } },
          }}
        >
          {slides.map((s, i) => (
            <SplideSlide key={i}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-start">
                {/* Photos - tampil dulu di mobile */}
                <div className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8 mt-6 md:mt-0">
                  <div
                    className="relative w-full aspect-square overflow-hidden rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    data-aos="fade-left"
                  >
                    <Image
                      src={s.imageSrc}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width:1024px) 520px, (min-width:768px) 70vw, 82vw"
                      priority={i === 0}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Title + desc - tampil setelah photo di mobile */}
                <div className="order-2 lg:order-1 lg:col-span-7 lg:col-end-8 mt-6 md:mt-10 lg:mt-16">
                  <div
                    className="bg-[#E0C698] w-full lg:-mr-px"
                    data-aos="fade-right"
                  >
                    <h3 className="px-6 py-4 font-minion-pro text-[#800000] leading-none text-3xl sm:text-4xl lg:text-5xl">
                      {s.title}
                    </h3>
                  </div>

                  <p
                    className="mt-6 text-[#800000] font-poppins text-sm sm:text-base lg:text-lg max-w-2xl"
                    data-aos="fade-up"
                    data-aos-delay="120"
                  >
                    {s.desc}
                  </p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
}
