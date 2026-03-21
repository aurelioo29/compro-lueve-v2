"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardModal from "@/app/components/ui/DashboardModal";
import { collectionDetailItemSchema } from "../../schemas/collection-detail-item.schema";
import { useCreateCollectionDetailItem } from "../../hooks/useCreateCollectionDetailItem";
import { useUpdateCollectionDetailItem } from "../../hooks/useUpdateCollectionDetailItem";

export default function CollectionDetailItemFormModal({
  open,
  onClose,
  itemId,
  sectionId,
  detailItem = null,
}) {
  const isEdit = !!detailItem;

  const { mutateAsync: createDetailItem, isPending: isCreating } =
    useCreateCollectionDetailItem();

  const { mutateAsync: updateDetailItem, isPending: isUpdating } =
    useUpdateCollectionDetailItem();

  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionDetailItemSchema),
    defaultValues: {
      label: "",
      value: "",
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        label: detailItem?.label || "",
        value: detailItem?.value || "",
        sortOrder: detailItem?.sortOrder ?? 0,
      });
    }
  }, [open, detailItem, reset]);

  async function onSubmit(values) {
    const payload = {
      label: values.label,
      value: values.value,
      sortOrder: values.sortOrder,
    };

    if (isEdit) {
      await updateDetailItem({
        id: detailItem.id,
        itemId,
        payload,
      });
    } else {
      await createDetailItem({
        sectionId,
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
      title={isEdit ? "Edit Detail Item" : "Create Detail Item"}
      description="Manage label and value for this detail row."
      size="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Label
          </label>
          <input
            type="text"
            {...register("label")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.label && (
            <p className="mt-2 text-sm text-red-600">{errors.label.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Value
          </label>
          <input
            type="text"
            {...register("value")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.value && (
            <p className="mt-2 text-sm text-red-600">{errors.value.message}</p>
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
                : "Create Detail Item"}
          </button>
        </div>
      </form>
    </DashboardModal>
  );
}
