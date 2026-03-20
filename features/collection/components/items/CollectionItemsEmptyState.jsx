"use client";

import { PackageOpen } from "lucide-react";

export default function CollectionItemsEmptyState() {
  return (
    <tr>
      <td colSpan={8} className="px-5 py-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 rounded-2xl bg-[#f3f5f9] p-4">
            <PackageOpen className="h-6 w-6 text-[#9ca3af]" />
          </div>
          <h4 className="text-lg font-semibold text-[#111827]">
            No items found
          </h4>
          <p className="mt-2 max-w-md text-sm text-[#6b7280]">
            Try adjusting your filters or create a new collection item.
          </p>
        </div>
      </td>
    </tr>
  );
}
