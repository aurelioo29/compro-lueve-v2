// app/[locale]/collection/wedding/col/[slug]/page.jsx
import React from "react";
import { notFound } from "next/navigation";
import { COL_ITEMS } from "@/app/data/wedding";
import DetailCatalog from "@/app/components/ui/catalog/wedding/DetailCatalog";

export async function generateStaticParams() {
  return COL_ITEMS.map((x) => ({ slug: x.slug }));
}

export const dynamicParams = false;
export const dynamic = "error";
export const revalidate = false;

export default async function DetailCOLPageCatalog({ params }) {
  const { slug } = await params; // ✅ params is Promise in Next 15

  const item = COL_ITEMS.find((x) => x.slug === slug);
  if (!item) return notFound();

  return <DetailCatalog item={item} scope="col" />;
}
