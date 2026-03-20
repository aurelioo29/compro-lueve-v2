import axiosInstance from "@/lib/axios";

export async function updateCollectionCategoryApi(id, payload) {
  const response = await axiosInstance.patch(
    `/collections/categories/${id}`,
    payload,
  );

  return response.data;
}
