"use client";

import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardModal from "@/app/components/ui/DashboardModal";
import { collectionImageSchema } from "../../schemas/collection-image.schema";
import { useUploadCollectionImage } from "../../hooks/useUploadCollectionImage";

export default function CollectionImageUploadModal({
  open,
  onClose,
  itemId,
  item = null,
}) {
  const { mutateAsync, isPending } = useUploadCollectionImage();
  const [preview, setPreview] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const hasPrimaryImage = useMemo(() => {
    return (item?.images || []).some((img) => img.imageType === "PRIMARY");
  }, [item?.images]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionImageSchema),
    defaultValues: {
      imageType: hasPrimaryImage ? "GALLERY" : "PRIMARY",
      altText: "",
      sortOrder: 0,
      image: undefined,
    },
  });

  const watchedFile = watch("image");
  const watchedImageType = watch("imageType");

  useEffect(() => {
    if (!watchedFile || !(watchedFile instanceof File)) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(watchedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [watchedFile]);

  useEffect(() => {
    if (open) {
      reset({
        imageType: hasPrimaryImage ? "GALLERY" : "PRIMARY",
        altText: "",
        sortOrder: 0,
        image: undefined,
      });
      setPreview(null);
      setSubmitError("");
    }
  }, [open, reset, hasPrimaryImage]);

  useEffect(() => {
    if (hasPrimaryImage && watchedImageType === "PRIMARY") {
      setValue("imageType", "GALLERY");
    }
  }, [hasPrimaryImage, watchedImageType, setValue]);

  async function onSubmit(values) {
    setSubmitError("");

    if (hasPrimaryImage && values.imageType === "PRIMARY") {
      setSubmitError("Only one PRIMARY image is allowed for this item.");
      return;
    }

    try {
      await mutateAsync({
        itemId,
        payload: {
          imageType: values.imageType,
          altText: values.altText || "",
          sortOrder: values.sortOrder,
          image: values.image,
        },
      });

      onClose();
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to upload image. Please try again.";

      setSubmitError(message);
      console.error("UPLOAD ERROR:", error?.response?.data || error);
    }
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title="Upload Image"
      description="Add a new image to this collection item."
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Image Type
          </label>

          <select
            {...register("imageType")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          >
            <option value="PRIMARY" disabled={hasPrimaryImage}>
              PRIMARY
            </option>
            <option value="GALLERY">GALLERY</option>
            <option value="BOTTOM">BOTTOM</option>
          </select>

          {hasPrimaryImage && (
            <p className="mt-2 text-sm text-[#b45309]">
              Only one PRIMARY image is allowed. This item already has a PRIMARY
              image.
            </p>
          )}

          {errors.imageType && (
            <p className="mt-2 text-sm text-red-600">
              {errors.imageType.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Alt Text
          </label>
          <input
            type="text"
            {...register("altText")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.altText && (
            <p className="mt-2 text-sm text-red-600">
              {errors.altText.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Sort Order
          </label>
          <input
            type="number"
            min={0}
            {...register("sortOrder")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.sortOrder && (
            <p className="mt-2 text-sm text-red-600">
              {errors.sortOrder.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Image File
          </label>

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  onChange(file || undefined);
                }}
                className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-[#4f7df3] file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
              />
            )}
          />

          {errors.image && (
            <p className="mt-2 text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>

        {preview && (
          <div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-3">
            <img
              src={preview}
              alt="Preview"
              className="h-64 w-full rounded-xl object-cover"
            />
          </div>
        )}

        {submitError && (
          <div className="rounded-xl border border-[#fee2e2] bg-[#fff5f5] px-4 py-3 text-sm text-[#b91c1c]">
            {submitError}
          </div>
        )}

        <div className="flex justify-end gap-3 border-t border-[#eef0f4] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#374151]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </form>
    </DashboardModal>
  );
}
