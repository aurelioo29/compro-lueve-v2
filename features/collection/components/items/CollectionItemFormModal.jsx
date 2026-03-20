"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardModal from "@/app/components/ui/DashboardModal";
import { collectionItemSchema } from "../../schemas/collection-item.schema";
import { useCreateCollectionItem } from "../../hooks/useCreateCollectionItem";
import { useUpdateCollectionItem } from "../../hooks/useUpdateCollectionItem";
import { useCollectionCategories } from "../../hooks/useCollectionCategories";

export default function CollectionItemFormModal({
  open,
  onClose,
  item = null,
}) {
  const isEdit = !!item;

  const { mutateAsync: createItem, isPending: isCreating } =
    useCreateCollectionItem();

  const { mutateAsync: updateItem, isPending: isUpdating } =
    useUpdateCollectionItem();

  const { data: categoriesData } = useCollectionCategories({
    page: 1,
    limit: 100,
    sortBy: "sortOrder",
    order: "asc",
  });

  const categories = categoriesData?.data || [];
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionItemSchema),
    defaultValues: {
      categoryId: "",
      name: "",
      meaning: "",
      description: "",
      status: "DRAFT",
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        categoryId: item?.categoryId || "",
        name: item?.name || "",
        meaning: item?.meaning || "",
        description: item?.description || "",
        status: item?.status || "DRAFT",
        sortOrder: item?.sortOrder ?? 0,
      });
    }
  }, [item, open, reset]);

  async function onSubmit(values) {
    const payload = {
      categoryId: values.categoryId,
      name: values.name,
      meaning: values.meaning || "",
      description: values.description || "",
      status: values.status,
      sortOrder: values.sortOrder,
    };

    if (isEdit) {
      await updateItem({
        id: item.id,
        payload,
      });
    } else {
      await createItem(payload);
    }

    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Item" : "Create Item"}
      description="Manage collection item identity, category, and publishing status."
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Category
          </label>
          <select
            {...register("categoryId")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.parent?.name
                  ? `${category.parent.name} / ${category.name}`
                  : category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="mt-2 text-sm text-red-600">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Meaning
          </label>
          <input
            type="text"
            {...register("meaning")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.meaning && (
            <p className="mt-2 text-sm text-red-600">
              {errors.meaning.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Description
          </label>
          <textarea
            rows={4}
            {...register("description")}
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm outline-none"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Status
            </label>
            <select
              {...register("status")}
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
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
                : "Create Item"}
          </button>
        </div>
      </form>
    </DashboardModal>
  );
}
