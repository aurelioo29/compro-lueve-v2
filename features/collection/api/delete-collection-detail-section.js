import axiosInstance from "@/lib/axios";

export async function deleteCollectionDetailSectionApi(id) {
  const response = await axiosInstance.delete(
    `/collections/detail-sections/${id}`,
  );

  return response.data;
}
