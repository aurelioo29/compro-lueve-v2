import axiosInstance from "@/lib/axios";

export async function deleteWaResponseApi(id) {
  const response = await axiosInstance.delete(`/wa-responses/${id}`);
  return response.data;
}
