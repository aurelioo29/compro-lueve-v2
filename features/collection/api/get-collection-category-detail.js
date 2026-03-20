import axiosInstance from "@/lib/axios";

export async function getCollectionCategoryDetailApi(id) {
  const response = await axiosInstance.get(`/collection-categories/${id}`);
  return response.data;
}
