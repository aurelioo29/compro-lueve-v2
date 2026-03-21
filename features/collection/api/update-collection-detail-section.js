import axiosInstance from "@/lib/axios";

export async function updateCollectionDetailSectionApi(id, payload) {
  const response = await axiosInstance.patch(
    `/collections/detail-sections/${id}`,
    payload,
  );

  return response.data;
}
