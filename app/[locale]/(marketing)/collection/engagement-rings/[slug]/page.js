import React from "react";
import { notFound } from "next/navigation";
import { ENGAGEMENT_ITEMS } from "@/app/data/engagement";
import DetailCatalog from "@/app/components/ui/catalog/engagement/DetailCatalog";

// ==== WAJIB untuk static export: daftar semua slug ====
export async function generateStaticParams() {
  return ENGAGEMENT_ITEMS.map((x) => ({ slug: x.slug }));
}

// Kunci biar gak ada path dadakan waktu runtime
export const dynamicParams = false;
export const dynamic = "error";
export const revalidate = false;

export default async function DetailPageCatalog({ params }) {
  const { slug } = await params; // ✅ Next 15: params is a Promise

  const item = ENGAGEMENT_ITEMS.find((x) => x.slug === slug);
  if (!item) return notFound();

  return <DetailCatalog item={item} scope="engagement" />;
}
