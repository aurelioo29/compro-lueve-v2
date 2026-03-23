"use client";

import { useMutation } from "@tanstack/react-query";
import { exportWaResponsesApi } from "../api/export-wa-responses";

function getFilenameFromDisposition(disposition) {
  if (!disposition) return "wa-responses-export";

  const utfMatch = disposition.match(/filename\*=UTF-8''([^;]+)/);
  if (utfMatch?.[1]) {
    return decodeURIComponent(utfMatch[1]);
  }

  const plainMatch = disposition.match(/filename="(.+?)"/);
  if (plainMatch?.[1]) {
    return plainMatch[1];
  }

  return "wa-responses-export";
}

function downloadBlobFile(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  window.URL.revokeObjectURL(url);
}

export function useExportWaResponses() {
  return useMutation({
    mutationFn: exportWaResponsesApi,
    onSuccess: (response) => {
      const disposition = response.headers["content-disposition"];
      const filename = getFilenameFromDisposition(disposition);
      downloadBlobFile(response.data, filename);
    },
  });
}
