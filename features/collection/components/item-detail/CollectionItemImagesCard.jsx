"use client";

import { useMemo, useState } from "react";
import { ImagePlus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { useReorderCollectionImages } from "../../hooks/useReorderCollectionImages";
import CollectionImageUploadModal from "./CollectionImageUploadModal";
import CollectionImageDeleteModal from "./CollectionImageDeleteModal";

function groupImages(images = []) {
  return {
    primary: images.filter((img) => img.imageType === "PRIMARY"),
    gallery: images.filter((img) => img.imageType === "GALLERY"),
    bottom: images.filter((img) => img.imageType === "BOTTOM"),
  };
}

function getImageUrl(imageUrl) {
  if (!imageUrl) return null;

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

  const origin = apiBase.replace("/api", "");

  return `${origin}${imageUrl}`;
}

function ImageSection({
  title,
  images = [],
  itemId,
  onDeleteClick,
  onMoveUp,
  onMoveDown,
  isReordering,
}) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9ca3af]">
          {title}
        </h4>
      </div>

      {images.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-[22px] border border-[#eef0f4] bg-white"
            >
              <div className="aspect-[4/3] bg-[#f9fafb]">
                <img
                  src={getImageUrl(image.imageUrl)}
                  alt={image.altText || image.imageType}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-3 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full bg-[#eff6ff] px-3 py-1 text-xs font-semibold text-[#1d4ed8]">
                    {image.imageType}
                  </span>

                  <span className="text-xs font-medium text-[#9ca3af]">
                    Order: {image.sortOrder ?? 0}
                  </span>
                </div>

                <p className="text-sm text-[#6b7280]">
                  {image.altText || "No alt text"}
                </p>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onMoveUp(index, title)}
                      disabled={index === 0 || isReordering}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowUp size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => onMoveDown(index, title)}
                      disabled={index === images.length - 1 || isReordering}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ArrowDown size={16} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onDeleteClick(image)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#fee2e2] text-[#dc2626] hover:bg-[#fff5f5]"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[20px] border border-dashed border-[#d1d5db] bg-[#fafafa] px-6 py-12 text-center">
          <p className="text-sm text-[#6b7280]">
            No images in this section yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CollectionItemImagesCard({ item }) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutateAsync: reorderImages, isPending: isReordering } =
    useReorderCollectionImages();

  const images = item?.images || [];

  const grouped = useMemo(() => groupImages(images), [images]);

  async function reorderWithinGroup(list, currentIndex, nextIndex) {
    const updated = [...list];
    const [moved] = updated.splice(currentIndex, 1);
    updated.splice(nextIndex, 0, moved);

    const payload = updated.map((img, index) => ({
      id: img.id,
      sortOrder: index,
    }));

    await reorderImages({
      itemId: item.id,
      payload,
    });
  }

  async function handleMoveUp(index, groupName) {
    const key = groupName.toLowerCase();
    const list = grouped[key] || [];
    if (index <= 0) return;

    await reorderWithinGroup(list, index, index - 1);
  }

  async function handleMoveDown(index, groupName) {
    const key = groupName.toLowerCase();
    const list = grouped[key] || [];
    if (index >= list.length - 1) return;

    await reorderWithinGroup(list, index, index + 1);
  }

  return (
    <>
      <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
        <div className="flex flex-col gap-4 border-b border-[#eef0f4] pb-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-[20px] font-bold text-[#111827]">Images</h3>
            <p className="mt-1 text-sm text-[#6b7280]">
              Upload, organize, and manage primary, gallery, and bottom images.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setUploadOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(79,125,243,0.22)] hover:bg-[#3e6ee8]"
          >
            <ImagePlus size={16} />
            Upload Image
          </button>
        </div>

        <div className="mt-6 space-y-8">
          <ImageSection
            title="PRIMARY"
            images={grouped.primary}
            itemId={item?.id}
            onDeleteClick={(image) => {
              setSelectedImage(image);
              setDeleteOpen(true);
            }}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            isReordering={isReordering}
          />

          <ImageSection
            title="GALLERY"
            images={grouped.gallery}
            itemId={item?.id}
            onDeleteClick={(image) => {
              setSelectedImage(image);
              setDeleteOpen(true);
            }}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            isReordering={isReordering}
          />

          <ImageSection
            title="BOTTOM"
            images={grouped.bottom}
            itemId={item?.id}
            onDeleteClick={(image) => {
              setSelectedImage(image);
              setDeleteOpen(true);
            }}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            isReordering={isReordering}
          />
        </div>
      </div>

      <CollectionImageUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        itemId={item?.id}
      />

      <CollectionImageDeleteModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedImage(null);
        }}
        image={selectedImage}
        itemId={item?.id}
      />
    </>
  );
}
