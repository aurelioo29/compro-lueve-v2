import { z } from "zod";

export const publicWaResponseSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .min(1, "Phone / WhatsApp is required")
    .min(8, "Phone number must be at least 8 characters"),
  email: z.string().trim().optional().or(z.literal("")),
});

export const publicWaResponseSchemaWithEmailValidation =
  publicWaResponseSchema.superRefine((data, ctx) => {
    if (data.email && data.email.trim() !== "") {
      const emailCheck = z.string().email().safeParse(data.email);
      if (!emailCheck.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["email"],
          message: "Email format is invalid",
        });
      }
    }
  });
