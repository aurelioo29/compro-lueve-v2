import axiosInstance from "@/lib/axios";

export async function deleteCollectionCategoryApi(id) {
  const response = await axiosInstance.delete(`/collection/categories/${id}`);
  return response.data;
}
