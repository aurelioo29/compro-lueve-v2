"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function DashboardModal({
  open,
  onClose,
  title,
  description,
  children,
  size = "lg",
  hideCloseButton = false,
}) {
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || typeof window === "undefined") return null;

  const widthClass =
    size === "sm"
      ? "max-w-md"
      : size === "md"
        ? "max-w-2xl"
        : size === "xl"
          ? "max-w-7xl"
          : "max-w-3xl";

  return createPortal(
    <div className="fixed inset-0 z-[999]">
      <div
        className="absolute inset-0 bg-[#111827]/45 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="absolute inset-0 overflow-y-auto p-4 md:p-8">
        <div className="flex min-h-full items-center justify-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "dashboard-modal-title" : undefined}
            aria-describedby={
              description ? "dashboard-modal-description" : undefined
            }
            className={`relative w-full ${widthClass} overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(17,24,39,0.20)]`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#eef0f4] px-6 py-5 md:px-8">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  {title && (
                    <h2
                      id="dashboard-modal-title"
                      className="text-2xl font-bold tracking-[-0.02em] text-[#111827]"
                    >
                      {title}
                    </h2>
                  )}

                  {description && (
                    <p
                      id="dashboard-modal-description"
                      className="mt-1 text-sm leading-6 text-[#6b7280]"
                    >
                      {description}
                    </p>
                  )}
                </div>

                {!hideCloseButton && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e5e7eb] text-[#6b7280] transition hover:bg-[#f9fafb] hover:text-[#111827]"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[calc(100vh-140px)] overflow-y-auto px-6 py-6 md:px-8 md:py-7">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
