"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardModal from "@/app/components/ui/DashboardModal";
import { collectionCategorySchema } from "../schemas/collection-category.schema";
import { useCreateCollectionCategory } from "../hooks/useCreateCollectionCategory";
import { useUpdateCollectionCategory } from "../hooks/useUpdateCollectionCategory";
import { useCollectionCategories } from "../hooks/useCollectionCategories";

export default function CollectionCategoryFormModal({
  open,
  onClose,
  item = null,
}) {
  const isEdit = !!item;

  const { mutateAsync: createCategory, isPending: isCreating } =
    useCreateCollectionCategory();

  const { mutateAsync: updateCategory, isPending: isUpdating } =
    useUpdateCollectionCategory();

  const { data: parentCategoriesData } = useCollectionCategories({
    parentId: null,
    page: 1,
    limit: 100,
    sortBy: "sortOrder",
    order: "asc",
  });

  const parentOptions = parentCategoriesData?.data || [];
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionCategorySchema),
    defaultValues: {
      parentId: null,
      name: "",
      description: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        parentId: item?.parent?.id || item?.parentId || null,
        name: item?.name || "",
        description: item?.description || "",
        isActive: item?.isActive ?? true,
        sortOrder: item?.sortOrder ?? 0,
      });
    }
  }, [item, open, reset]);

  async function onSubmit(values) {
    const payload = {
      parentId: values.parentId || null,
      name: values.name,
      description: values.description || "",
      isActive: values.isActive,
      sortOrder: values.sortOrder,
    };

    if (isEdit) {
      await updateCategory({
        id: item.id,
        payload,
      });
    } else {
      await createCategory(payload);
    }

    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Category" : "Create Category"}
      description="Manage collection category hierarchy, status, and order."
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Parent Category
          </label>
          <select
            {...register("parentId")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          >
            <option value="">No Parent (Root Category)</option>
            {parentOptions
              .filter((parent) => parent.id !== item?.id)
              .map((parent) => (
                <option key={parent.id} value={parent.id}>
                  {parent.name}
                </option>
              ))}
          </select>
          {errors.parentId && (
            <p className="mt-2 text-sm text-red-600">
              {errors.parentId.message}
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
              {...register("isActive", {
                setValueAs: (value) => value === true || value === "true",
              })}
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
            >
              <option value="true">ACTIVE</option>
              <option value="false">INACTIVE</option>
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
                : "Create Category"}
          </button>
        </div>
      </form>
    </DashboardModal>
  );
}
