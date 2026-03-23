import axiosInstance from "@/lib/axios";

export async function exportWaResponsesApi(params = {}) {
  const response = await axiosInstance.get("/wa-responses/export", {
    params,
    responseType: "blob",
  });

  return response;
}
