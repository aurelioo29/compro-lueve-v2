import axiosInstance from "@/lib/axios";

export async function getCollectionCategoriesApi(params = {}) {
  const response = await axiosInstance.get("/collections/categories", {
    params,
  });

  return response.data;
}
