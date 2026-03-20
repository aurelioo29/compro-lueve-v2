import axiosInstance from "@/lib/axios";

export async function getCollectionItemsApi(params = {}) {
  const response = await axiosInstance.get("/collections/items", {
    params,
  });

  return response.data;
}
