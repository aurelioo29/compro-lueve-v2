"use client";

import React from "react";
import ProductGrid from "@/app/components/ui/catalog/engagement/ProductGrid";
import { COL_ITEMS, WEDDING_HERO } from "@/app/data/wedding";
import CatalogHeroWedding from "@/app/components/ui/catalog/wedding/CatalogHeroWedding";
import WeddingTabs from "@/app/components/ui/catalog/wedding/WeddingTabs";

export default function COLPage() {
  return (
    <section className="pb-36">
      <CatalogHeroWedding
        src={WEDDING_HERO.col.src}
        alt={WEDDING_HERO.col.alt}
        bleedTop
        height={800}
      />

      <WeddingTabs />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-6">
        <ProductGrid items={COL_ITEMS} />
      </div>
    </section>
  );
}
