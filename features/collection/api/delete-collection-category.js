import axiosInstance from "@/lib/axios";

export async function deleteCollectionCategoryApi(id) {
  const response = await axiosInstance.delete(`/collections/categories/${id}`);
  return response.data;
}
