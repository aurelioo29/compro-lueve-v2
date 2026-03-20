import { z } from "zod";

export const collectionCategorySchema = z.object({
  parentId: z.string().uuid().nullable().optional(),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),

  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(z.literal("")),

  isActive: z.boolean(),

  sortOrder: z.coerce
    .number()
    .int("Sort order must be an integer")
    .min(0, "Sort order cannot be negative"),
});