import axiosInstance from "@/lib/axios";

export async function getCollectionItemDetailApi(id) {
  const response = await axiosInstance.get(`/collections/items/${id}`);
  return response.data;
}
