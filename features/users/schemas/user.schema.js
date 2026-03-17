import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),

  email: z.string().email("Email format is invalid"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  roleId: z.string().min(1, "Role is required"),

  isActive: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters"),

  email: z.string().email("Email format is invalid"),

  roleId: z.string().min(1, "Role is required"),

  isActive: z.boolean().optional(),
});
