"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import FeaturePrivilege from "./FeaturePrivilege";
import { motion } from "framer-motion";

export default function ThePrivilege() {
  const t = useTranslations("privilege");

  const left = Array.isArray(t.raw("left")) ? t.raw("left") : [];
  const right = Array.isArray(t.raw("right")) ? t.raw("right") : [];
  const image = t.raw("image") || {};

  const waPhone = "6281533780888";
  const waHref = `https://wa.me/${waPhone}?text=${encodeURIComponent(
    t("waText")
  )}`;

  const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.12 },
    },
  };

  return (
    <section id="the-lueve-privilege" className="py-12 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Title */}
        <motion.h2
          className="text-center font-minion-pro text-[#800000] text-4xl md:text-6xl lg:text-[90px] leading-20 max-w-sm mx-auto"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={fadeUp}
        >
          {t("title")}
        </motion.h2>

        {/* Grid utama */}
        <motion.div
          className="mt-10 md:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-y-10 lg:gap-14 items-start"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* Tagline */}
          <motion.div
            className="lg:col-span-3 flex flex-col items-center text-center order-0"
            variants={fadeUp}
          >
            <span className="inline-block rounded-full border border-[#800000] px-5 py-2 text-[#800000] font-minion-pro text-lg md:text-2xl transition-colors hover:bg-[#800000] hover:text-[#E0C698]">
              {t("tagline.title")}
            </span>
            <p className="mt-3 max-w-2xl text-[#800000]/90 font-poppins text-sm md:text-base">
              {t.rich("tagline.body", {
                brand: (chunks) => (
                  <span className="text-[#CEA660]">{chunks}</span>
                ),
              })}
            </p>
          </motion.div>

          {/* Kolom kiri */}
          <motion.div
            className="space-y-10 lg:space-y-16 order-2 lg:order-none"
            variants={fadeUp}
          >
            {left.map((f, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <FeaturePrivilege
                  title={f.title}
                  body={f.body}
                  mobileAlign={i % 2 === 0 ? "left" : "right"}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Gambar tengah */}
          <motion.div
            className="flex justify-center order-1 lg:order-none"
            variants={fadeUp}
          >
            <motion.div
              className="relative w-64 sm:w-80 lg:w-[420px] aspect-square rounded-full overflow-hidden shadow-xl"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }, // <- transition dipindah ke sini
              }}
              viewport={{ once: true, amount: 0.4 }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} // <- satu-satunya prop `transition` pada elemen ini
            >
              <Image
                src={image.src}
                alt={image.alt || ""}
                fill
                sizes="(min-width:1024px) 420px, 80vw"
                className="object-cover"
                priority
              />
            </motion.div>
          </motion.div>

          {/* Kolom kanan */}
          <motion.div
            className="space-y-10 lg:space-y-16 order-3 lg:order-none"
            variants={fadeUp}
          >
            {right.map((f, i) => {
              const globalIndex = i + left.length;
              return (
                <motion.div key={i} variants={fadeUp} custom={i}>
                  <FeaturePrivilege
                    title={f.title}
                    body={f.body}
                    mobileAlign={globalIndex % 2 === 0 ? "left" : "right"}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="lg:col-span-3 flex justify-center order-4"
            variants={fadeUp}
          >
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#800000] px-5 py-2 text-[#800000] font-poppins hover:border-[#CEA660]"
              aria-label={t("cta")}
            >
              {t("cta")}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 bg-[#CEA660] rounded-full" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
