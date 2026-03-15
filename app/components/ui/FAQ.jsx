"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// AOS
import AOS from "aos";
import "aos/dist/aos.css";

const MAROON = "#800000";

export default function FAQ() {
  const t = useTranslations("faq");
  const raw = t.raw("items");
  const items = Array.isArray(raw) ? raw : [];
  const [open, setOpen] = useState(new Set());

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  const toggle = (idx) => {
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-24 md:py-28"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      id="q-n-a"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <h2
          id="faq-heading"
          className="text-center font-minion-pro text-[#800000] uppercase text-3xl sm:text-3xl md:text-6xl lg:text-7xl"
          data-aos="fade-up"
        >
          {t("heading.top")}
          <br className="hidden sm:block" />
          {t("heading.bottom")}
        </h2>

        {/* Card wrapper */}
        <div className="mt-10 md:mt-14 flex justify-center" data-aos="zoom-in">
          <div className="w-full max-w-3xl rounded-[28px] bg-white shadow-[0_25px_70px_rgba(0,0,0,.18)] ring-1 ring-black/5 p-5 sm:p-7 md:p-8">
            <dl>
              {items.map((it, idx) => {
                const isOpen = open.has(idx);

                return (
                  <div
                    key={idx}
                    className="py-2"
                    data-aos="fade-up"
                    data-aos-delay={Math.min(idx * 80, 400)}
                  >
                    {/* Header row (question + icon) */}
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${idx}`}
                      className="w-full flex items-center justify-between gap-4 py-2 text-left"
                    >
                      <span className="font-poppins text-[14px] md:text-[21px] leading-7 text-[#800000]">
                        {it.q}
                      </span>

                      {/* right icon: chevron (closed) -> minus (open) */}
                      <AnimatePresence initial={false} mode="wait">
                        {isOpen ? (
                          <motion.span
                            key="minus"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: 0.16 }}
                            aria-hidden
                            className="block"
                          >
                            <span
                              className="block h-[2px] w-6 md:w-7 rounded-sm"
                              style={{ backgroundColor: MAROON }}
                            />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="chevron"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.16 }}
                            aria-hidden
                            className="block"
                          >
                            <ChevronDown
                              className="w-5 h-5"
                              style={{ color: MAROON }}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>

                    {/* ANSWER (animated height) */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.dd
                          id={`faq-panel-${idx}`}
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.26,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 pb-4">
                            <p className="text-[#800000] text-sm md:text-[18px] leading-7 font-poppins">
                              {it.a}
                            </p>
                          </div>
                        </motion.dd>
                      )}
                    </AnimatePresence>

                    {/* Bottom underline */}
                    <div
                      className="mt-2 h-px w-full"
                      style={{ backgroundColor: MAROON }}
                      aria-hidden
                    />
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
