import axiosInstance from "@/lib/axios";

export async function reorderCollectionImagesApi(payload) {
  const response = await axiosInstance.patch(
    "/collections/images/reorder",
    payload,
  );

  return response.data;
}
