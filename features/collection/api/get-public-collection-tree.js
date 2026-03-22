import axiosInstance from "@/lib/axios";

export async function getPublicCollectionTreeApi() {
  const response = await axiosInstance.get(
    "/public/collection-categories/tree",
  );
  return response.data;
}
