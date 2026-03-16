"use client";

import Modal from "@/app/components/ui/Modal";
import { useDeleteWaResponse } from "../hooks/useDeleteWaResponse";

export default function WaResponseDeleteModal({ open, onClose, item }) {
  const { mutateAsync, isPending } = useDeleteWaResponse();

  async function handleDelete() {
    if (!item?.id) return;

    await mutateAsync(item.id);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-lg space-y-5">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            Delete Confirmation
          </p>
          <h2 className="mt-1 text-3xl font-bold text-[#111827]">
            Delete WA Response
          </h2>
        </div>

        <p className="text-sm leading-6 text-[#6b7280]">
          Are you sure you want to delete the WA response from{" "}
          <span className="font-semibold text-[#111827]">
            {item?.fullName || "-"}
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
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
    </Modal>
  );
}
