"use client";

import { useQuery } from "@tanstack/react-query";
import { getActivityLogsApi } from "../api/get-activity-logs";

export function useActivityLogs(params) {
  return useQuery({
    queryKey: ["activity-logs", params],
    queryFn: () => getActivityLogsApi(params),
    keepPreviousData: true,
  });
}
