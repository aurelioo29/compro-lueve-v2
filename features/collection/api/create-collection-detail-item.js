import axiosInstance from "@/lib/axios";

export async function createCollectionDetailItemApi(sectionId, payload) {
  const response = await axiosInstance.post(
    `/collections/detail-sections/${sectionId}/items`,
    payload,
  );

  return response.data;
}