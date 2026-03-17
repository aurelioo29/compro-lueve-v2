import { z } from "zod";

const BLOG_STATUS = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be at most 200 characters"),

  excerpt: z
    .string()
    .max(500, "Excerpt must be at most 500 characters")
    .optional()
    .or(z.literal("")),

  content: z.string().min(20, "Content must be at least 20 characters"),

  status: z.enum(BLOG_STATUS),

  coverImage: z.any().optional(),
});
