"use client";

import DashboardModal from "@/app/components/ui/DashboardModal";
import { useDeleteCollectionDetailSection } from "../../hooks/useDeleteCollectionDetailSection";

export default function CollectionDetailSectionDeleteModal({
  open,
  onClose,
  section,
  itemId,
}) {
  const { mutateAsync, isPending } = useDeleteCollectionDetailSection();

  async function handleDelete() {
    if (!section?.id) return;

    await mutateAsync({
      id: section.id,
      itemId,
    });

    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title="Delete Detail Section"
      description="This action will permanently remove the selected detail section."
      size="sm"
    >
      <div className="space-y-5">
        <p className="text-sm leading-6 text-[#6b7280]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#111827]">
            {section?.title || "-"}
          </span>
          ?
        </p>

        <div className="rounded-xl bg-[#fff7ed] px-4 py-3 text-sm text-[#9a3412]">
          Any detail items inside this section may also be removed by backend
          cascade rules.
        </div>

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
