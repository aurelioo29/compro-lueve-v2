"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { useReorderCollectionImages } from "../../hooks/useReorderCollectionImages";
import CollectionImageUploadModal from "./CollectionImageUploadModal";
import CollectionImageDeleteModal from "./CollectionImageDeleteModal";

import {
  DndContext,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function getImageUrl(imageUrl) {
  if (!imageUrl) return null;

  const apiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

  const origin = apiBase.replace("/api", "");
  return `${origin}${imageUrl}`;
}

function groupImages(images = []) {
  return {
    primary: [...images]
      .filter((img) => img.imageType === "PRIMARY")
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    gallery: [...images]
      .filter((img) => img.imageType === "GALLERY")
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    bottom: [...images]
      .filter((img) => img.imageType === "BOTTOM")
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
  };
}

function SortableImageCard({
  image,
  index,
  imagesLength,
  isReordering = false,
  onDeleteClick = () => {},
  onMoveUp = () => {},
  onMoveDown = () => {},
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const fullImageUrl = getImageUrl(image.imageUrl);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`overflow-hidden rounded-[22px] border border-[#eef0f4] bg-white ${
        isDragging ? "opacity-70" : ""
      }`}
    >
      <div className="aspect-[4/3] bg-[#f9fafb]">
        {fullImageUrl ? (
          <img
            src={fullImageUrl}
            alt={image.altText || image.imageType}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#9ca3af]">
            No preview
          </div>
        )}
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

        <p className="min-h-[40px] text-sm text-[#6b7280]">
          {image.altText || "No alt text"}
        </p>

        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb] cursor-grab active:cursor-grabbing"
            aria-label="Drag image"
          >
            <GripVertical size={16} />
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onMoveUp(index)}
              disabled={index === 0 || isReordering}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp size={16} />
            </button>

            <button
              type="button"
              onClick={() => onMoveDown(index)}
              disabled={index === imagesLength - 1 || isReordering}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowDown size={16} />
            </button>

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
    </div>
  );
}

function ImageSection({
  title,
  groupKey,
  images = [],
  description = "",
  isReordering = false,
  sensors,
  onDeleteClick = () => {},
  onMoveUp = () => {},
  onMoveDown = () => {},
  onDragEnd = () => {},
}) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#9ca3af]">
            {title}
          </h4>

          <span className="rounded-full bg-[#f3f4f6] px-2.5 py-1 text-xs font-medium text-[#6b7280]">
            {images.length}
          </span>
        </div>

        {description ? (
          <p className="mt-2 text-sm text-[#6b7280]">{description}</p>
        ) : null}
      </div>

      {images.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={images.map((image) => image.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {images.map((image, index) => (
                <SortableImageCard
                  key={image.id}
                  image={image}
                  index={index}
                  imagesLength={images.length}
                  isReordering={isReordering}
                  onDeleteClick={onDeleteClick}
                  onMoveUp={onMoveUp}
                  onMoveDown={onMoveDown}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        <div className="rounded-[20px] border border-dashed border-[#d1d5db] bg-[#fafafa] px-6 py-12 text-center">
          <p className="text-sm text-[#6b7280]">
            No images in the {groupKey} section yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CollectionItemImagesCard({
  item,
  uploadOpenSignal = 0,
}) {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { mutateAsync: reorderImages, isPending: isReordering } =
    useReorderCollectionImages();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const images = item?.images || [];
  const grouped = useMemo(() => groupImages(images), [images]);

  useEffect(() => {
    if (uploadOpenSignal > 0) {
      setUploadOpen(true);
    }
  }, [uploadOpenSignal]);

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

  async function handleDragEnd(groupList, event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = groupList.findIndex((img) => img.id === active.id);
    const newIndex = groupList.findIndex((img) => img.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const moved = arrayMove(groupList, oldIndex, newIndex);

    const payload = moved.map((img, index) => ({
      id: img.id,
      sortOrder: index,
    }));

    await reorderImages({
      itemId: item.id,
      payload,
    });
  }

  async function handleMoveUp(list, index) {
    if (index <= 0) return;
    await reorderWithinGroup(list, index, index - 1);
  }

  async function handleMoveDown(list, index) {
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
            groupKey="primary"
            description="Only one PRIMARY image is allowed."
            images={grouped.primary}
            sensors={sensors}
            isReordering={isReordering}
            onDeleteClick={(image) => {
              setSelectedImage(image);
              setDeleteOpen(true);
            }}
            onMoveUp={(index) => handleMoveUp(grouped.primary, index)}
            onMoveDown={(index) => handleMoveDown(grouped.primary, index)}
            onDragEnd={(event) => handleDragEnd(grouped.primary, event)}
          />

          <ImageSection
            title="GALLERY"
            groupKey="gallery"
            description="You can add multiple gallery images."
            images={grouped.gallery}
            sensors={sensors}
            isReordering={isReordering}
            onDeleteClick={(image) => {
              setSelectedImage(image);
              setDeleteOpen(true);
            }}
            onMoveUp={(index) => handleMoveUp(grouped.gallery, index)}
            onMoveDown={(index) => handleMoveDown(grouped.gallery, index)}
            onDragEnd={(event) => handleDragEnd(grouped.gallery, event)}
          />

          <ImageSection
            title="BOTTOM"
            groupKey="bottom"
            description="You can add multiple bottom images."
            images={grouped.bottom}
            sensors={sensors}
            isReordering={isReordering}
            onDeleteClick={(image) => {
              setSelectedImage(image);
              setDeleteOpen(true);
            }}
            onMoveUp={(index) => handleMoveUp(grouped.bottom, index)}
            onMoveDown={(index) => handleMoveDown(grouped.bottom, index)}
            onDragEnd={(event) => handleDragEnd(grouped.bottom, event)}
          />
        </div>
      </div>

      <CollectionImageUploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        itemId={item?.id}
        item={item}
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
