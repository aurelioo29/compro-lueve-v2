"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

const ITEMS = [
  {
    href: "/collection/wedding-rings/constellation-of-love",
    label: "Constellation of Love",
    src: "/images/collection/wedding/pic-2.png",
    alt: "Constellation of Love cover",
    // rotate: "-rotate-270", 
  },
  {
    href: "/collection/wedding-rings/silhouettes-of-earth",
    label: "Silhouette of Earth",
    src: "/images/collection/wedding/soe.png",
    alt: "Silhouette of Earth cover",
  },
  {
    href: "/collection/wedding-rings/the-heritage",
    label: "The Heritage",
    src: "/images/collection/wedding/heritage.png",
    alt: "The Heritage cover",
  },
];

export default function WeddingCoverGrid() {
  return (
    <section aria-labelledby="wedding-cover-heading" className="py-12 md:py-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-2">
        {/* Heading */}
        <h2
          id="wedding-cover-heading"
          className="text-center font-minion-pro text-[#CEA660] text-3xl md:text-5xl lg:text-6xl"
        >
          OUR WEDDING
        </h2>
        <p className="mt-1 text-center font-minion-pro tracking-[0.35em] text-[#800000]/80">
          RING CATALOG
        </p>

        <div className="mt-8 md:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {ITEMS.map((it, i) => (
            <Link
              key={it.label}
              href={it.href}
              className="group relative block aspect-[4/5] rounded-xl overflow-hidden shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CEA660]"
              aria-label={it.label}
            >
              <Image
                src={it.src}
                alt={it.alt}
                fill
                priority={i === 0}
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className={[
                  "object-cover transition duration-300 group-hover:blur-[2px] group-focus-visible:blur-[2px] group-hover:scale-[1.02]",
                  it.rotate ?? "",
                ].join(" ")}
              />

              {/* scrim & label tetap sama */}
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10 group-focus-visible:bg-black/10" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <span className="opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 font-minion-pro text-xl md:text-2xl text-[#CEA660] backdrop-blur-sm rounded-full px-5 py-2 shadow-sm bg-[#800000]">
                  {it.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
