"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardModal from "@/app/components/ui/DashboardModal";
import { collectionImageSchema } from "../../schemas/collection-image.schema";
import { useUploadCollectionImage } from "../../hooks/useUploadCollectionImage";

export default function CollectionImageUploadModal({ open, onClose, itemId }) {
  const { mutateAsync, isPending } = useUploadCollectionImage();
  const [preview, setPreview] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionImageSchema),
    defaultValues: {
      imageType: "GALLERY",
      altText: "",
      sortOrder: 0,
      image: undefined,
    },
  });

  const watchedFile = watch("image");

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
    if (!open) {
      reset({
        imageType: "GALLERY",
        altText: "",
        sortOrder: 0,
        image: undefined,
      });
      setPreview(null);
    }
  }, [open, reset]);

  async function onSubmit(values) {
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
            <option value="PRIMARY">PRIMARY</option>
            <option value="GALLERY">GALLERY</option>
            <option value="BOTTOM">BOTTOM</option>
          </select>
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
