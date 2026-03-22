import axiosInstance from "@/lib/axios";

export async function exportActivityLogsApi(params = {}) {
  const response = await axiosInstance.get("/activity-logs/export", {
    params,
    responseType: "blob",
  });

  return response;
}