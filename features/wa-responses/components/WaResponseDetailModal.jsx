"use client";

import Modal from "@/app/components/ui/Modal";
import { useWaResponseDetail } from "../hooks/useWaResponseDetail";

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function WaResponseDetailModal({ open, onClose, responseId }) {
  const { data, isLoading, isError, error } = useWaResponseDetail(
    responseId,
    open,
  );

  const item = data?.data;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full max-w-2xl space-y-6">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            WA Response
          </p>
          <h2 className="mt-1 text-3xl font-bold text-[#111827]">
            Response Detail
          </h2>
        </div>

        {isLoading ? (
          <p className="text-sm text-[#6b7280]">Loading detail...</p>
        ) : isError ? (
          <p className="text-sm text-red-600">
            {error?.response?.data?.message || "Failed to load detail"}
          </p>
        ) : item ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-[#6b7280]">Full Name</p>
              <p className="mt-1 font-medium text-[#111827]">
                {item.fullName || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6b7280]">Phone Number</p>
              <p className="mt-1 font-medium text-[#111827]">
                {item.phoneNumber || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6b7280]">Email</p>
              <p className="mt-1 font-medium text-[#111827]">
                {item.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6b7280]">Status</p>
              <p className="mt-1 font-medium text-[#111827]">
                {item.status || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6b7280]">Created At</p>
              <p className="mt-1 font-medium text-[#111827]">
                {formatDate(item.createdAt || item.created_at)}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#6b7280]">Updated At</p>
              <p className="mt-1 font-medium text-[#111827]">
                {formatDate(item.updatedAt || item.updated_at)}
              </p>
            </div>

            <div className="sm:col-span-2">
              <p className="text-sm text-[#6b7280]">Notes</p>
              <p className="mt-1 font-medium text-[#111827] whitespace-pre-line">
                {item.notes || "-"}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
