import { z } from "zod";

export const collectionDetailSectionSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be at most 100 characters"),
  sortOrder: z.coerce
    .number()
    .int("Sort order must be an integer")
    .min(0, "Sort order cannot be negative"),
});
