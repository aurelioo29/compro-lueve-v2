"use client";

import React from "react";
import ProductGrid from "@/app/components/ui/catalog/engagement/ProductGrid";
import { HERITAGE_ITEMS, WEDDING_HERO } from "@/app/data/wedding";
import CatalogHeroWedding from "@/app/components/ui/catalog/wedding/CatalogHeroWedding";
import WeddingTabs from "@/app/components/ui/catalog/wedding/WeddingTabs";

export default function TheHeritagePage() {
  return (
    <section className="pb-36">
      <CatalogHeroWedding
        src={WEDDING_HERO.heritage.src}
        alt={WEDDING_HERO.heritage.alt}
        bleedTop
        height={700}
      />

      <WeddingTabs />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-6">
        <ProductGrid items={HERITAGE_ITEMS} />
      </div>
    </section>
  );
}
