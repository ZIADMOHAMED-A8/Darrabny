import { z } from "zod";

export const signupSchema = z
  .object({
    firstName: z.string().trim().min(2, "First name is required"),
    lastName: z.string().trim().min(2, "Last name is required"),
    username: z
      .string()
      .trim()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username is too long")
      .regex(/^[a-zA-Z0-9._-]+$/, "Username contains invalid characters"),
    email: z.string().trim().email("Enter a valid email"),
    countryCode: z.string().min(1, "Country code is required"),
    phone: z
      .string()
      .trim()
      .min(7, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\d+$/, "Phone must be digits only"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/\d/, "Password must include a number"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupValues = z.infer<typeof signupSchema>;
