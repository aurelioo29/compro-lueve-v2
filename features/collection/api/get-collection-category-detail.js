import axiosInstance from "@/lib/axios";

export async function getCollectionCategoryDetailApi(id) {
  const response = await axiosInstance.get(`/collections/categories/${id}`);
  return response.data;
}
