"use client";

import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardModal from "@/app/components/ui/DashboardModal";
import BlogQuillEditor from "./BlogQuillEditor";
import { blogSchema } from "@/features/blogs/schemas/blog.schema";
import { useCreateBlog } from "../hooks/useCreateBlog";
import { useUpdateBlog } from "../hooks/useUpdateBlog";

function stripHtml(html = "") {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();
}

export default function BlogFormModal({ open, onClose, item = null }) {
  const isEdit = !!item;

  const { mutateAsync: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutateAsync: updateBlog, isPending: isUpdating } = useUpdateBlog();

  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      status: "DRAFT",
      coverImage: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        title: item?.title || "",
        excerpt: item?.excerpt || "",
        content: item?.content || "",
        status: item?.status || "DRAFT",
        coverImage: undefined,
      });
    }
  }, [item, open, reset]);

  const watchedCoverImage = watch("coverImage");

  const selectedFileName = useMemo(() => {
    if (!watchedCoverImage) return "";
    if (watchedCoverImage instanceof FileList && watchedCoverImage.length > 0) {
      return watchedCoverImage[0].name;
    }
    return "";
  }, [watchedCoverImage]);

  async function onSubmit(values) {
    const plainTextContent = stripHtml(values.content);

    if (plainTextContent.length < 20) {
      setError("content", {
        type: "manual",
        message: "Content must be at least 20 characters",
      });
      return;
    }

    const payload = {
      title: values.title.trim(),
      excerpt: values.excerpt?.trim() || "",
      content: values.content,
      status: values.status,
      coverImage:
        values.coverImage instanceof FileList && values.coverImage.length > 0
          ? values.coverImage[0]
          : undefined,
    };

    if (isEdit) {
      await updateBlog({
        id: item.id,
        payload,
      });
    } else {
      await createBlog(payload);
    }

    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Blog" : "Create Blog"}
      description="Manage your blog content, cover image, and publication status."
      size="xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#374151] outline-none"
            placeholder="Enter blog title"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Excerpt
          </label>
          <textarea
            rows={3}
            {...register("excerpt")}
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm text-[#374151] outline-none"
            placeholder="Write short excerpt"
          />
          {errors.excerpt && (
            <p className="mt-2 text-sm text-red-600">
              {errors.excerpt.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Content
          </label>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <BlogQuillEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Write your blog content..."
              />
            )}
          />

          {errors.content && (
            <p className="mt-2 text-sm text-red-600">
              {errors.content.message}
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
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#374151] outline-none"
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PUBLISHED">PUBLISHED</option>
              <option value="ARCHIVED">ARCHIVED</option>
            </select>
            {errors.status && (
              <p className="mt-2 text-sm text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Cover Image
            </label>

            <input
              type="file"
              accept="image/*"
              {...register("coverImage")}
              className="block w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 text-sm text-[#374151]"
            />

            {selectedFileName && (
              <p className="mt-2 text-xs text-[#6b7280]">
                Selected: {selectedFileName}
              </p>
            )}

            {item?.coverImage && !selectedFileName && (
              <p className="mt-2 text-xs text-[#6b7280]">
                Current cover image is already set.
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#eef0f4] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
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
                : "Create Blog"}
          </button>
        </div>
      </form>
    </DashboardModal>
  );
}
