import axiosInstance from "@/lib/axios";

export async function getActivityLogsApi(params = {}) {
  const response = await axiosInstance.get("/activity-logs", {
    params,
  });

  return response.data;
}
