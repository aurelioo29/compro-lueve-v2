import axiosInstance from "@/lib/axios";

export async function createCollectionItemApi(payload) {
  const response = await axiosInstance.post("/collections/items", payload);
  return response.data;
}
