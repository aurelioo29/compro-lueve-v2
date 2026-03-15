"use client";

import React, { useEffect, useMemo, useState } from "react";
import CatalogHero from "@/app/components/ui/catalog/engagement/CatalogHero";
import ProductGrid from "@/app/components/ui/catalog/engagement/ProductGrid";
import Pagination from "@/app/components/ui/common/Pagination";
import {
  ENGAGEMENT_ITEMS,
  ENGAGEMENT_HERO_BY_PAGE,
} from "@/app/data/engagement";

const PER_PAGE = 9;

export default function EngagementRingsPage() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(ENGAGEMENT_ITEMS.length / PER_PAGE);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return ENGAGEMENT_ITEMS.slice(start, start + PER_PAGE);
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const hero = ENGAGEMENT_HERO_BY_PAGE[page] || ENGAGEMENT_HERO_BY_PAGE[2];

  return (
    <section className="pb-36">
      <CatalogHero src={hero.src} alt={hero.alt} bleedTop height={700} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h1 className="mt-20 mb-12 text-center font-poppins text-[#800000] text-2xl md:text-3xl">
          Engagement
        </h1>

        <ProductGrid items={pageItems} />

        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </section>
  );
}
