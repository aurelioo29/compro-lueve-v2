import { z } from "zod";

export const collectionDetailItemSchema = z.object({
  label: z
    .string()
    .min(1, "Label must be at least 1 character")
    .max(100, "Label must be at most 100 characters"),
  value: z
    .string()
    .min(1, "Value must be at least 1 character")
    .max(255, "Value must be at most 255 characters"),
  sortOrder: z.coerce
    .number()
    .int("Sort order must be an integer")
    .min(0, "Sort order cannot be negative"),
});
