"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useCollectionItemDetail } from "../../hooks/useCollectionItemDetail";
import CollectionItemInfoCard from "./CollectionItemInfoCard";
import CollectionItemImagesCard from "./CollectionItemImagesCard";
import CollectionItemDetailSectionsCard from "./CollectionItemDetailSectionsCard";

export default function CollectionItemDetailPageContent({ id }) {
  const { data, isLoading, isError, error } = useCollectionItemDetail(id);

  const item = data?.data || null;

  if (!id) {
    return (
      <section className="space-y-6">
        <div className="rounded-[24px] bg-white p-10 text-center shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
          <h3 className="text-lg font-semibold text-[#111827]">
            Invalid item ID
          </h3>
          <p className="mt-2 text-sm text-[#6b7280]">
            The page did not receive a valid collection item ID.
          </p>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="rounded-[24px] bg-white p-10 text-center shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
          <p className="text-sm text-[#6b7280]">Loading item detail...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="space-y-6">
        <div className="rounded-[24px] bg-white p-10 text-center shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
          <h3 className="text-lg font-semibold text-[#111827]">
            Failed to load item detail
          </h3>
          <p className="mt-2 text-sm text-[#6b7280]">
            {error?.response?.data?.message ||
              "Something went wrong while loading item detail."}
          </p>
        </div>
      </section>
    );
  }

  if (!item) {
    return (
      <section className="space-y-6">
        <div className="rounded-[24px] bg-white p-10 text-center shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
          <h3 className="text-lg font-semibold text-[#111827]">
            Item not found
          </h3>
          <p className="mt-2 text-sm text-[#6b7280]">
            The requested collection item could not be found.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/dashboard/collections/items"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4f7df3] hover:text-[#3e6ee8]"
          >
            <ChevronLeft size={16} />
            Back to Items
          </Link>

          <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            Collection Item Builder
          </p>
          <h1 className="mt-1 text-[38px] font-bold tracking-[-0.03em] text-[#111827]">
            {item.name || "Item Detail"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b7280]">
            Manage the item information, image assets, and detail sections for
            this collection item.
          </p>
        </div>
      </div>

      <CollectionItemInfoCard item={item} />
      <CollectionItemImagesCard item={item} />
      <CollectionItemDetailSectionsCard item={item} />
    </section>
  );
}
