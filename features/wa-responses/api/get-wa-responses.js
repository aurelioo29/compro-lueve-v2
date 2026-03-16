import axiosInstance from "@/lib/axios";

export async function getWaResponsesApi(params = {}) {
  const response = await axiosInstance.get("/wa-responses", {
    params,
  });

  return response.data;
}