"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";

export default function SortableDetailRow({
  detailItem,
  onEdit = () => {},
  onDelete = () => {},
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: detailItem.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`${isDragging ? "opacity-70" : ""} bg-white`}
    >
      <td className="rounded-l-xl border-y border-l border-[#eef0f4] px-4 py-4">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#6b7280] hover:bg-[#f9fafb]"
        >
          <GripVertical size={16} />
        </button>
      </td>

      <td className="border-y border-[#eef0f4] px-4 py-4 text-sm font-semibold text-[#111827]">
        {detailItem.label || "-"}
      </td>

      <td className="border-y border-[#eef0f4] px-4 py-4 text-sm text-[#4b5563]">
        {detailItem.value || "-"}
      </td>

      <td className="border-y border-[#eef0f4] px-4 py-4 text-sm text-[#6b7280]">
        {detailItem.sortOrder ?? 0}
      </td>

      <td className="rounded-r-xl border-y border-r border-[#eef0f4] px-4 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#fee2e2] text-[#dc2626] hover:bg-[#fff5f5]"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
