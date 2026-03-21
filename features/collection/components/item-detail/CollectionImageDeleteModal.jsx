"use client";

import DashboardModal from "@/app/components/ui/DashboardModal";
import { useDeleteCollectionImage } from "../../hooks/useDeleteCollectionImage";

export default function CollectionImageDeleteModal({
  open,
  onClose,
  image,
  itemId,
}) {
  const { mutateAsync, isPending } = useDeleteCollectionImage();

  async function handleDelete() {
    if (!image?.id) return;

    await mutateAsync({
      id: image.id,
      itemId,
    });

    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title="Delete Image"
      description="This action will permanently remove the selected image."
      size="sm"
    >
      <div className="space-y-5">
        <p className="text-sm leading-6 text-[#6b7280]">
          Are you sure you want to delete this{" "}
          <span className="font-semibold text-[#111827]">
            {image?.imageType || "image"}
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
