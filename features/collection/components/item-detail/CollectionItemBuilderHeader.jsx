"use client";

import Link from "next/link";
import { ChevronLeft, ImagePlus, Pencil, Plus } from "lucide-react";

function getStatusBadgeClass(status) {
  switch (String(status || "").toUpperCase()) {
    case "PUBLISHED":
      return "bg-[#dcfce7] text-[#15803d]";
    case "DRAFT":
      return "bg-[#fef3c7] text-[#b45309]";
    case "ARCHIVED":
      return "bg-[#fee2e2] text-[#b91c1c]";
    default:
      return "bg-[#f3f4f6] text-[#374151]";
  }
}

export default function CollectionItemBuilderHeader({
  item,
  totalImages = 0,
  totalSections = 0,
  onEditItem = () => {},
  onUploadImage = () => {},
  onAddSection = () => {},
}) {
  if (!item) return null;

  const categoryLabel = item.category?.parent?.name
    ? `${item.category.parent.name} / ${item.category.name}`
    : item.category?.name || "-";

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
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

          <h1 className="mt-2 break-words text-[34px] font-bold tracking-[-0.03em] text-[#111827] md:text-[38px]">
            {item.name || "Item Detail"}
          </h1>

          <p className="mt-2 text-sm text-[#6b7280]">{item.slug || "-"}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusBadgeClass(
                item.status,
              )}`}
            >
              {item.status || "-"}
            </span>

            <span className="inline-flex rounded-full bg-[#eff6ff] px-3 py-1.5 text-xs font-semibold text-[#1d4ed8]">
              {categoryLabel}
            </span>

            <span className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs font-semibold text-[#374151]">
              {totalImages} images
            </span>

            <span className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs font-semibold text-[#374151]">
              {totalSections} sections
            </span>

            <span className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs font-semibold text-[#374151]">
              Sort {item.sortOrder ?? 0}
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-[#6b7280]">
            Manage the item information, visual assets, and technical detail
            sections from one builder view.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onEditItem}
            className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
          >
            <Pencil size={16} />
            Edit Item
          </button>

          <button
            type="button"
            onClick={onUploadImage}
            className="inline-flex items-center gap-2 rounded-xl border border-[#dbeafe] bg-[#eff6ff] px-4 py-2.5 text-sm font-medium text-[#1d4ed8] hover:bg-[#dbeafe]"
          >
            <ImagePlus size={16} />
            Upload Image
          </button>

          <button
            type="button"
            onClick={onAddSection}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(79,125,243,0.22)] hover:bg-[#3e6ee8]"
          >
            <Plus size={16} />
            Add Section
          </button>
        </div>
      </div>
    </div>
  );
}
