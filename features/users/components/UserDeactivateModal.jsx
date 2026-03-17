"use client";

import DashboardModal from "@/app/components/ui/DashboardModal";
import { useDeactivateUser } from "../hooks/useDeactivateUser";

export default function UserDeactivateModal({ open, onClose, item }) {
  const { mutateAsync, isPending } = useDeactivateUser();

  async function handleDeactivate() {
    if (!item?.id) return;

    await mutateAsync(item.id);
    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title="Deactivate User"
      description="This action will disable the selected account."
      size="sm"
    >
      <div className="space-y-5">
        <p className="text-sm leading-6 text-[#6b7280]">
          Are you sure you want to deactivate{" "}
          <span className="font-semibold text-[#111827]">
            {item?.name || "-"}
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
            onClick={handleDeactivate}
            disabled={isPending}
            className="rounded-xl bg-[#dc2626] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending ? "Deactivating..." : "Deactivate"}
          </button>
        </div>
      </div>
    </DashboardModal>
  );
}
