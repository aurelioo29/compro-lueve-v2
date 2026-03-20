import axiosInstance from "@/lib/axios";

export async function deleteCollectionItemApi(id) {
  const response = await axiosInstance.delete(`/collections/items/${id}`);
  return response.data;
}
