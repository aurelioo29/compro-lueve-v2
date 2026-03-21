import axiosInstance from "@/lib/axios";

export async function deleteCollectionDetailItemApi(id) {
  const response = await axiosInstance.delete(
    `/collections/detail-items/${id}`,
  );
  return response.data;
}
