import axiosInstance from "@/lib/axios";

export async function deleteCollectionImageApi(id) {
  const response = await axiosInstance.delete(`/collections/images/${id}`);
  return response.data;
}
