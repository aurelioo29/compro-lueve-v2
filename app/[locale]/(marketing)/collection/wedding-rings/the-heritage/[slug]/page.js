// app/[locale]/collection/wedding/heritage/[slug]/page.jsx
import React from "react";
import { notFound } from "next/navigation";
import { HERITAGE_ITEMS } from "@/app/data/wedding";
import DetailCatalog from "@/app/components/ui/catalog/wedding/DetailCatalog";

// Wajib untuk static export: pre-list semua slug
export function generateStaticParams() {
  return HERITAGE_ITEMS.map((x) => ({ slug: x.slug }));
}

export const dynamicParams = false;
export const dynamic = "error";
export const revalidate = false;

export default async function DetailHeritagePageCatalog({ params }) {
  const { slug } = await params;
  const item = HERITAGE_ITEMS.find((x) => x.slug === slug);
  if (!item) return notFound();
  return <DetailCatalog item={item} scope="heritage" />;
}
