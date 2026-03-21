"use client";

import { useMemo, useState } from "react";
import { useCollectionItemDetail } from "../../hooks/useCollectionItemDetail";
import CollectionItemInfoCard from "./CollectionItemInfoCard";
import CollectionItemImagesCard from "./CollectionItemImagesCard";
import CollectionItemDetailSectionsCard from "./CollectionItemDetailSectionsCard";
import CollectionItemBuilderHeader from "./CollectionItemBuilderHeader";
import CollectionItemBuilderStats from "./CollectionItemBuilderStats";
import CollectionItemFormModal from "../items/CollectionItemFormModal";

export default function CollectionItemDetailPageContent({ id }) {
  const { data, isLoading, isError, error } = useCollectionItemDetail(id);

  const [editItemOpen, setEditItemOpen] = useState(false);
  const [imageUploadOpenSignal, setImageUploadOpenSignal] = useState(0);
  const [sectionCreateOpenSignal, setSectionCreateOpenSignal] = useState(0);

  const item = data?.data || null;

  const totalImages = item?.images?.length || 0;
  const totalSections = item?.detailSections?.length || 0;

  const totalDetailItems = useMemo(() => {
    if (!item?.detailSections?.length) return 0;

    return item.detailSections.reduce((acc, section) => {
      return acc + (section.items?.length || 0);
    }, 0);
  }, [item?.detailSections]);

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
    <>
      <section className="space-y-6">
        <CollectionItemBuilderHeader
          item={item}
          totalImages={totalImages}
          totalSections={totalSections}
          onEditItem={() => setEditItemOpen(true)}
          onUploadImage={() => setImageUploadOpenSignal((prev) => prev + 1)}
          onAddSection={() => setSectionCreateOpenSignal((prev) => prev + 1)}
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[460px_minmax(0,1fr)] 2xl:grid-cols-[520px_minmax(0,1fr)]">
          <div className="space-y-6 xl:sticky xl:top-6 xl:self-start">
            <CollectionItemBuilderStats
              totalImages={totalImages}
              totalSections={totalSections}
              totalDetailItems={totalDetailItems}
              status={item.status}
              compact
            />

            <CollectionItemInfoCard item={item} />
          </div>

          <div className="min-w-0 space-y-6">
            <CollectionItemImagesCard
              item={item}
              uploadOpenSignal={imageUploadOpenSignal}
            />

            <CollectionItemDetailSectionsCard
              item={item}
              createOpenSignal={sectionCreateOpenSignal}
            />
          </div>
        </div>
      </section>

      <CollectionItemFormModal
        open={editItemOpen}
        onClose={() => setEditItemOpen(false)}
        item={item}
      />
    </>
  );
}
