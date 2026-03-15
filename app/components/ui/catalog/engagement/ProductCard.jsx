"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ item }) {
  return (
    <article className="group">
      <Link href={item.href} aria-label={item.name}>
        {/* kecil di mobile, normal di ≥md */}
        <div className="relative mx-auto w-[78%] sm:w-[85%] md:w-full aspect-square overflow-hidden shadow-sm">
          <Image
            src={item.image}
            alt={item.alt || item.name}
            fill
            sizes="(min-width:1024px) 350px, (min-width:640px) 45vw, 65vw"
            className="object-contain p-2 sm:p-2 md:p-0 transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-center font-minion-pro text-lg md:text-2xl uppercase text-[#800000]">
          {item.name}
        </p>
      </Link>
    </article>
  );
}
