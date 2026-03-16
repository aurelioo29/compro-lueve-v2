"use client";

import { ShieldAlert } from "lucide-react";

export default function WaResponsesErrorState({ message }) {
  return (
    <tr>
      <td colSpan={7} className="px-5 py-12 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 rounded-2xl bg-[#fee2e2] p-4">
            <ShieldAlert className="h-6 w-6 text-[#dc2626]" />
          </div>
          <h4 className="text-lg font-semibold text-[#111827]">
            Failed to load WA responses
          </h4>
          <p className="mt-2 max-w-md text-sm text-[#6b7280]">
            {message || "Something went wrong while loading WA responses."}
          </p>
        </div>
      </td>
    </tr>
  );
}
