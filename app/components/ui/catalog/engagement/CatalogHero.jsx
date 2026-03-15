"use client";

import Image from "next/image";
import React from "react";

export default function CatalogHero({
  src,
  alt = "",
  bleedTop = true,
  height = 420,
}) {
  return (
    <section
      className={`${
        bleedTop ? "-mt-[96px] md:-mt-[120px]" : ""
      } relative overflow-x-clip`}
    >
      {/* full-bleed container */}
      <div
        className="relative left-1/2 -translate-x-1/2 w-[100sw] overflow-hidden h-[42vh] sm:h-[40vh] lg:h-[var(--heroH)]"
        style={{ "--heroH": `${height}px` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-contain"
        />
      </div>

      {/* veil agar navbar tetap kebaca */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[96px] md:h-[120px] bg-gradient-to-b from-white/60 to-transparent" />
    </section>
  );
}
