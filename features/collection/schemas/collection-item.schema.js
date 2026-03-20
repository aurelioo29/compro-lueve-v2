import { z } from "zod";

export const collectionItemSchema = z.object({
  categoryId: z.string().uuid("Category is required"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(150, "Name must be at most 150 characters"),
  meaning: z.string().optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  sortOrder: z.coerce
    .number()
    .int("Sort order must be an integer")
    .min(0, "Sort order cannot be negative"),
});
