"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 grid place-items-center"
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* panel (responsive) */}
      <div
        className="
        relative z-50 w-full
        max-w-[calc(100%-2rem)]
        sm:max-w-sm
        md:max-w-xl      
        lg:max-w-6xl     
        sm:h-[600px]
        md:h-[720px]
        rounded-xl sm:rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-8 shadow-xl overflow-hidden text-white"
      >
        {/* background image layer */}
        <div className="absolute inset-0">
          <Image
            src="/images/modal/background-modal.svg"
            alt="Background"
            fill
            priority
            sizes="(max-width:640px) 100vw, (max-width:1024px) 80vw, 60vw"
            className="object-cover"
          />
        </div>

        {/* close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-2 top-3 sm:right-5 sm:top-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#7E7979] hover:bg-[#7E7979]/80 text-white cursor-pointer"
        >
          <X className="h-6 w-6" />
        </button>

        {/* content */}
        <div className="relative max-h-[80vh] overflow-y-auto pr-2">
          {children}
        </div>
      </div>
    </div>
  );
}
