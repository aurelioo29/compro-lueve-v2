import axiosInstance from "@/lib/axios";

export async function updateCollectionItemApi(id, payload) {
  const response = await axiosInstance.patch(
    `/collections/items/${id}`,
    payload,
  );
  return response.data;
}
