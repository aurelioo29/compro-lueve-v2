"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

/* -------- utils -------- */
function safeRaw(t, key, fallback) {
  try {
    return t.raw(key);
  } catch {
    return fallback;
  }
}

/* -------- SPEC COLUMN -------- */
function SpecCol({ title, items = {}, className = "" }) {
  const rows = Object.entries(items).filter(
    ([k, v]) => String(k || "").trim() && String(v || "").trim(),
  );
  if (!rows.length) return null;

  const isMetal = title === "METAL";

  return (
    <div
      className={`w-full min-w-0 mx-auto flex flex-col items-center ${className}`}
    >
      <h3 className="text-center font-minion-pro text-[#800000] text-xl md:text-2xl font-semibold">
        {title}
      </h3>

      <div className="mt-8 mx-auto w-full">
        <dl
          className="
            grid
            grid-cols-[auto_minmax(0,1fr)]
            gap-x-6 md:gap-x-10
            gap-y-2
            text-[#800000]
            w-full
            min-w-0
          "
        >
          {rows.map(([label, value]) => (
            <React.Fragment key={label}>
              <dt className="font-minion-pro text-base md:text-lg whitespace-normal break-words text-left min-w-0">
                {label.replaceAll("·", ".")}
              </dt>

              <dd
                className={`
                  font-minion-pro text-base md:text-lg text-left min-w-0 break-words
                  ${
                    isMetal
                      ? "max-w-[260px] whitespace-normal"
                      : "whitespace-normal"
                  }
                `}
              >
                {Array.isArray(value) ? value.join(", ") : value}
              </dd>
            </React.Fragment>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* -------- DOTTED DIVIDER -------- */
function DottedDividers({ count }) {
  if (count < 2) return null;

  const positions = Array.from(
    { length: count - 1 },
    (_, i) => ((i + 1) / count) * 100,
  );

  return (
    <div className="hidden xl:block absolute inset-y-0 left-0 right-0 pointer-events-none">
      {positions.map((pct, idx) => (
        <span
          key={idx}
          className="absolute top-0 bottom-0 border-l-[3px] border-dotted border-[#D9C293]"
          style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
        />
      ))}
    </div>
  );
}

/* -------- PARAGRAPHS -------- */
function Paragraphs({ text }) {
  const raw = String(text ?? "");

  const normalized = raw
    .replace(/<\/?space\s*\/?>/gi, "\n\n")
    .replace(/\r\n/g, "\n");

  const paragraphs = normalized
    .split(/\n{2,}/g)
    .map((p) => p.trim())
    .filter(Boolean);

  if (!paragraphs.length) return null;

  return (
    <div className="space-y-5 md:space-y-6">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="font-minion-pro text-[#800000]/90 text-[15px] md:text-[20px] leading-[1.7] text-justify"
        >
          {p.split("\n").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

/* -------- SCROLL REVEAL -------- */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setShow(true),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

/* -------- MAIN DETAIL -------- */
export default function DetailCatalog({ item }) {
  const t = useTranslations("engagement.details");
  const detail = safeRaw(t, item.slug, null);

  const description = detail?.description ?? "";
  const specs = detail?.specs ?? {};

  const groups = [
    specs.centerDiamond && {
      title: "CENTRE DIAMOND",
      items: specs.centerDiamond,
    },
    specs.sideDiamond && { title: "SIDE DIAMOND", items: specs.sideDiamond },
    specs.metal && { title: "METAL", items: specs.metal },
  ].filter(Boolean);

  const colCount = groups.length;

  const gridCols =
    colCount === 3
      ? "xl:grid-cols-3"
      : colCount === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-1";

  const gridGaps =
    colCount === 2
      ? "md:gap-x-32 lg:gap-x-40"
      : colCount === 3
        ? "xl:gap-x-20 2xl:gap-x-28"
        : "md:gap-x-20 lg:gap-x-28";

  return (
    <section className="py-12 md:py-20">
      <div className="mx-auto max-w-[1500px] px-10 sm:px-6">
        {/* IMAGE + DESCRIPTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="group relative w-full max-w-[520px] aspect-square mx-auto overflow-hidden rounded-md bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-500 hover:shadow-[0_16px_50px_rgba(0,0,0,0.14)]">
                <Image
                  src={item.image}
                  alt={item.alt || item.name}
                  fill
                  sizes="(min-width: 1024px) 520px, 90vw"
                  quality={90}
                  className="object-contain transition-transform duration-500 will-change-transform group-hover:scale-[1.02]"
                  priority
                />

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 overflow-hidden rounded-md"
                >
                  <span className="absolute top-0 -left-1/3 h-full w-1/3 bg-white/20 blur-[2px] -skew-x-12 translate-x-[-160%] transition-transform duration-700 group-hover:translate-x-[360%]" />
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={120}>
              <dl className="grid grid-cols-[max-content_1fr] gap-x-32 gap-y-2">
                <dt className="font-minion-pro text-[15px] md:text-[20px] text-[#800000]">
                  Name
                </dt>
                <dd className="font-minion-pro text-[#800000] uppercase tracking-[0.045em] text-[15px] md:text-[20px]">
                  {item.name}
                </dd>

                <dt className="font-minion-pro text-[15px] md:text-[20px] text-[#800000]">
                  Meaning
                </dt>
                <dd>
                  <Paragraphs text={description} />
                </dd>
              </dl>
            </Reveal>
          </div>
        </div>

        {/* DETAIL SECTION */}
        <div className="mt-16 md:mt-20">
          <Reveal>
            <div className="text-center">
              <h2 className="font-minion-pro text-[#D9C293] tracking-widest text-3xl md:text-4xl">
                DETAIL
              </h2>
              <div className="mt-5 mx-auto max-w-[1500px] border-t-[4px] border-[#D9C293]" />
            </div>
          </Reveal>

          <div
            className={`relative mt-12 grid grid-cols-1
              ${gridCols} ${gridGaps}
              gap-y-16 xl:gap-y-0
              items-start justify-items-center`}
          >
            <DottedDividers count={colCount} />

            {groups.map((g, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <SpecCol
                  title={g.title}
                  items={g.items}
                  className={`w-full max-w-[380px] min-w-0 ${
                    idx > 0 ? "mt-8 md:mt-10 xl:mt-0" : ""
                  }`}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
