import axiosInstance from "@/lib/axios";

export async function updateCollectionCategoryApi(id, payload) {
  const response = await axiosInstance.patch(
    `/collection-categories/${id}`,
    payload,
  );

  return response.data;
}
