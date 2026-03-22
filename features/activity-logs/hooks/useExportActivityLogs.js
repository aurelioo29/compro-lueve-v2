"use client";

import { useMutation } from "@tanstack/react-query";
import { exportActivityLogsApi } from "../api/export-activity-logs";

function getFilenameFromDisposition(disposition) {
  if (!disposition) return "activity-logs-export";

  const utfMatch = disposition.match(/filename\*=UTF-8''([^;]+)/);
  if (utfMatch?.[1]) {
    return decodeURIComponent(utfMatch[1]);
  }

  const plainMatch = disposition.match(/filename="(.+?)"/);
  if (plainMatch?.[1]) {
    return plainMatch[1];
  }

  return "activity-logs-export";
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

export function useExportActivityLogs() {
  return useMutation({
    mutationFn: exportActivityLogsApi,
    onSuccess: (response) => {
      const disposition = response.headers["content-disposition"];
      const filename = getFilenameFromDisposition(disposition);
      downloadBlobFile(response.data, filename);
    },
  });
}