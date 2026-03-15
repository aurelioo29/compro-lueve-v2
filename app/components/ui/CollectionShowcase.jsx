"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

export default function CollectionShowcase() {
  const t = useTranslations("collectionShowcase");
  const slides = Array.isArray(t.raw("slides")) ? t.raw("slides") : [];

  // ✅ satu deskripsi doang (taruh di i18n: collectionShowcase.desc)
  const desc = t.raw("desc") || "";

  return (
    <section
      aria-labelledby="collection-heading"
      className="relative py-12 md:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2
          id="collection-heading"
          className="text-center font-minion-pro text-[40px] sm:text-5xl md:text-6xl leading-none tracking-wide text-[#7b0f12] mb-6 md:mb-10"
        >
          {t("vertical")}
        </h2>

        <div className="relative md:mt-14">
          <Swiper
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            loop={slides.length > 1}
            autoplay={
              slides.length > 1
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    reverseDirection: true,
                  }
                : false
            }
            coverflowEffect={{
              rotate: 18,
              stretch: 0,
              depth: 160,
              modifier: 1.2,
              slideShadows: false,
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="collection-coverflow"
          >
            {slides.map((s, i) => (
              <SwiperSlide key={i} className="collection-coverflow-slide">
                <div className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-black/5">
                  <Image
                    src={s.imageSrc || "/placeholder.svg"}
                    alt={s.imageAlt || ""}
                    fill
                    sizes="(min-width:1024px) 420px, 72vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ✅ desc statis, gak berubah-ubah */}
          {desc && (
            <p className="mt-6 md:mt-12 font-poppins text-center max-w-3xl mx-auto text-xs sm:text-sm md:text-[15px] leading-relaxed text-[#7b0f12]">
              {desc}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
