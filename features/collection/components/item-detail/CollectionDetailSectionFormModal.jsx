"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardModal from "@/app/components/ui/DashboardModal";
import { collectionDetailSectionSchema } from "../../schemas/collection-detail-section.schema";
import { useCreateCollectionDetailSection } from "../../hooks/useCreateCollectionDetailSection";
import { useUpdateCollectionDetailSection } from "../../hooks/useUpdateCollectionDetailSection";

export default function CollectionDetailSectionFormModal({
  open,
  onClose,
  itemId,
  section = null,
}) {
  const isEdit = !!section;

  const { mutateAsync: createSection, isPending: isCreating } =
    useCreateCollectionDetailSection();

  const { mutateAsync: updateSection, isPending: isUpdating } =
    useUpdateCollectionDetailSection();

  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionDetailSectionSchema),
    defaultValues: {
      title: "",
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: section?.title || "",
        sortOrder: section?.sortOrder ?? 0,
      });
    }
  }, [open, section, reset]);

  async function onSubmit(values) {
    const payload = {
      title: values.title,
      sortOrder: values.sortOrder,
    };

    if (isEdit) {
      await updateSection({
        id: section.id,
        itemId,
        payload,
      });
    } else {
      await createSection({
        itemId,
        payload,
      });
    }

    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Detail Section" : "Create Detail Section"}
      description="Manage detail sections for this collection item."
      size="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
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
            {isPending
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Save Changes"
                : "Create Section"}
          </button>
        </div>
      </form>
    </DashboardModal>
  );
}