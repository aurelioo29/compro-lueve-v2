import axiosInstance from "@/lib/axios";

export async function getWaResponseDetailApi(id) {
  const response = await axiosInstance.get(`/wa-responses/${id}`);
  return response.data;
}
