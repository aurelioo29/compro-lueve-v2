import axiosInstance from "@/lib/axios";

export async function createCollectionCategoryApi(payload) {
  const response = await axiosInstance.post("/collections/categories", payload);
  return response.data;
}
