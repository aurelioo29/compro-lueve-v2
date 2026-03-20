import axiosInstance from "@/lib/axios";

export async function getCollectionCategoriesApi(params = {}) {
  const response = await axiosInstance.get("/collection/categories", {
    params,
  });

  return response.data;
}
