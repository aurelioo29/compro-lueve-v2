import axiosInstance from "@/lib/axios";

export async function createCollectionDetailSectionApi(itemId, payload) {
  const response = await axiosInstance.post(
    `/collections/items/${itemId}/detail-sections`,
    payload,
  );

  return response.data;
}
