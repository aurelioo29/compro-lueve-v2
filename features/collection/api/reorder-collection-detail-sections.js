import axiosInstance from "@/lib/axios";

export async function reorderCollectionDetailSectionsApi(payload) {
  const response = await axiosInstance.patch(
    "/collections/detail-sections/reorder",
    payload,
  );

  return response.data;
}
