"use client";

import React from "react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ items }) {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
      {items.map((it) => (
        <ProductCard key={it.slug} item={it} />
      ))}
    </div>
  );
}
