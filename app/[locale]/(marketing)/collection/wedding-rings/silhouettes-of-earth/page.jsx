"use client";

import React from "react";
import ProductGrid from "@/app/components/ui/catalog/engagement/ProductGrid";
import { SOE_ITEMS, WEDDING_HERO } from "@/app/data/wedding";
import CatalogHeroWedding from "@/app/components/ui/catalog/wedding/CatalogHeroWedding";
import WeddingTabs from "@/app/components/ui/catalog/wedding/WeddingTabs";

export default function SOEPage() {
  return (
    <section className="pb-36">
      <CatalogHeroWedding
        src={WEDDING_HERO.soe.src}
        alt={WEDDING_HERO.soe.alt}
        bleedTop
        height={800}
      />

      <WeddingTabs />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-6">
        <ProductGrid items={SOE_ITEMS} />
      </div>
    </section>
  );
}
