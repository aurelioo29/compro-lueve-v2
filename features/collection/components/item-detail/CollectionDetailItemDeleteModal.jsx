"use client";

import DashboardModal from "@/app/components/ui/DashboardModal";
import { useDeleteCollectionDetailItem } from "../../hooks/useDeleteCollectionDetailItem";

export default function CollectionDetailItemDeleteModal({
  open,
  onClose,
  detailItem,
  itemId,
}) {
  const { mutateAsync, isPending } = useDeleteCollectionDetailItem();

  async function handleDelete() {
    if (!detailItem?.id) return;

    await mutateAsync({
      id: detailItem.id,
      itemId,
    });

    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title="Delete Detail Item"
      description="This action will permanently remove the selected detail row."
      size="sm"
    >
      <div className="space-y-5">
        <p className="text-sm leading-6 text-[#6b7280]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#111827]">
            {detailItem?.label || "-"}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3 border-t border-[#eef0f4] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#374151]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-xl bg-[#dc2626] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </DashboardModal>
  );
}
