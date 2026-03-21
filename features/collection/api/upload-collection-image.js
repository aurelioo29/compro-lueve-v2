import axiosInstance from "@/lib/axios";

export async function uploadCollectionImageApi(itemId, payload) {
  const formData = new FormData();

  formData.append("imageType", payload.imageType);

  if (payload.altText !== undefined) {
    formData.append("altText", payload.altText || "");
  }

  if (payload.sortOrder !== undefined) {
    formData.append("sortOrder", String(payload.sortOrder));
  }

  if (payload.image) {
    formData.append("image", payload.image);
  }

  const response = await axiosInstance.post(
    `/collections/items/${itemId}/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
