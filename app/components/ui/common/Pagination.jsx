"use client";

import React from "react";

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  const numbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      className="mt-20 flex items-center justify-center gap-10 text-[#800000] font-poppins"
      aria-label="Pagination"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="px-2 py-1 disabled:opacity-40 cursor-pointer"
        aria-label="Previous page"
      >
        &lt;
      </button>

      {numbers.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={page === n ? "page" : undefined}
          className={[
            "h-8 w-8 rounded-full text-xl font-semibold cursor-pointer",
            page === n ? "bg-[#CEA660]" : "hover:bg-black/5 text-[#800000]",
          ].join(" ")}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="px-2 py-1 disabled:opacity-40 cursor-pointer"
        aria-label="Next page"
      >
        &gt;
      </button>
    </nav>
  );
}
