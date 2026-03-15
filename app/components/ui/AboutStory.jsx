"use client";

import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";
import StoryCard from "./StoryCard";

export default function AboutStory() {
  const t = useTranslations("ourStory");
  const items = Array.isArray(t.raw("items")) ? t.raw("items") : [];

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <section aria-labelledby="story-heading" className="py-12 md:py-64">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <h2
          id="story-heading"
          className="text-center font-minion-pro text-[#800000] text-4xl md:text-6xl lg:text-7xl leading-tight"
          data-aos="fade-up"
        >
          {t("title")}
        </h2>

        {/* Cards grid */}
        <div className="mt-10 md:mt-36 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 place-items-center">
          {items.map((it, idx) => {
            const textLeft = idx % 2 === 0; // 0,2 kiri; 1,3 kanan
            const overlayLeft = textLeft; // blur sisi kebalikan
            const offsetClass =
              idx % 2 === 1 ? "lg:translate-y-8 xl:translate-y-40" : "";

            // animasi alternating: kiri -> fade-right (konten muncul dari sisi kiri)
            const contentAos = textLeft ? "fade-right" : "fade-left";
            const imgAos = "zoom-in"; // gambar zoom halus
            const baseDelay = Math.min(idx * 120, 360);

            return (
              <div
                key={idx}
                className={`w-full flex justify-center ${offsetClass} transition-transform`}
                data-aos="fade-up"
                data-aos-delay={baseDelay}
              >
                <StoryCard
                  item={it}
                  textLeft={textLeft}
                  overlayLeft={overlayLeft}
                  priority={idx === 0}
                  // kirim hint animasi ke dalam kartu
                  contentAos={contentAos}
                  contentDelay={baseDelay + 80}
                  imgAos={imgAos}
                  imgDelay={baseDelay + 40}
                  titleDelay={baseDelay + 120}
                  stepDelay={baseDelay + 160}
                  descDelay={baseDelay + 200}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
