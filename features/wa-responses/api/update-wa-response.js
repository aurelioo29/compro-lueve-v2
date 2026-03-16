import axiosInstance from "@/lib/axios";

export async function updateWaResponseApi({ id, payload }) {
  const response = await axiosInstance.patch(`/wa-responses/${id}`, payload);
  return response.data;
}
