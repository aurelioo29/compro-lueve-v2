"use client";

import { useEffect, useState } from "react";
import Modal from "@/app/components/ui/Modal";
import { useUpdateWaResponse } from "../hooks/useUpdateWaResponse";

export default function WaResponseEditModal({ open, onClose, item }) {
  const { mutateAsync, isPending } = useUpdateWaResponse();

  const [status, setStatus] = useState("PENDING");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (item) {
      setStatus(item.status || "PENDING");
      setNotes(item.notes || "");
    }
  }, [item]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!item?.id) return;

    await mutateAsync({
      id: item.id,
      payload: {
        status,
        notes,
      },
    });

    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            WA Response
          </p>
          <h2 className="mt-1 text-3xl font-bold text-[#111827]">
            Edit Response
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#374151] outline-none"
            >
              <option value="PENDING">Pending</option>
              <option value="RESPONDED">Responded</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Notes
            </label>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm text-[#374151] outline-none"
              placeholder="Add notes..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
