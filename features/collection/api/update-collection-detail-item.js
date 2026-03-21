import axiosInstance from "@/lib/axios";

export async function updateCollectionDetailItemApi(id, payload) {
  const response = await axiosInstance.patch(
    `/collections/detail-items/${id}`,
    payload,
  );

  return response.data;
}
