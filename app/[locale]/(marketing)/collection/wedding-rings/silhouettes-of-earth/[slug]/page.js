import React from "react";
import { notFound } from "next/navigation";
import { SOE_ITEMS } from "@/app/data/wedding";
import DetailCatalog from "@/app/components/ui/catalog/wedding/DetailCatalog";

export function generateStaticParams() {
  const slugs = SOE_ITEMS.map((x) => x.slug);
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
export const dynamic = "error";
export const revalidate = false;

export default async function DetailSOEPageCatalog({ params }) {
  const { slug } = await params;
  const item = SOE_ITEMS.find((x) => x.slug === slug);
  if (!item) return notFound();
  return <DetailCatalog item={item} scope="soe" />;
}
