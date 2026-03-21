import axiosInstance from "@/lib/axios";

export async function reorderCollectionDetailItemsApi(payload) {
  const response = await axiosInstance.patch(
    "/collections/detail-items/reorder",
    payload,
  );

  return response.data;
}
