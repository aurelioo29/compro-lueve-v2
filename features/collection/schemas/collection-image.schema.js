import { z } from "zod";

export const collectionImageSchema = z.object({
  imageType: z.enum(["PRIMARY", "GALLERY", "BOTTOM"]),
  altText: z.string().optional().or(z.literal("")),
  sortOrder: z.coerce
    .number()
    .int("Sort order must be an integer")
    .min(0, "Sort order cannot be negative"),
  image: z.instanceof(File, { message: "Image is required" }),
});
