import { z } from "zod";

export const GENDER = {
  MALE: "male",
  FEMALE: "female",
} as const;

export const signupSchema = z
  .object({
    role: z.enum([
      "student",
      "academic_supervisor",
      "company_supervisor",
      "college",
    ]),
    firstName: z.string().trim().min(2, "First name is required"),
    lastName: z.string().trim().min(2, "Last name is required"),
    email: z.string().trim().email("Enter a valid email"),
    mobileNumber: z
      .string()
      .trim()
      .min(10, "Phone number is too short")
      .max(15, "Phone number is too long")
      .regex(/^\d+$/, "Mobile must be digits only"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include an uppercase letter")
      .regex(/[a-z]/, "Password must include a lowercase letter")
      .regex(/\d/, "Password must include a number"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    gender: z.enum([GENDER.MALE, GENDER.FEMALE]),
    DOB: z.string().min(10, "Date of Birth is required"),
    // role: z.string().min(3, "Role is required"),
  })
  .refine((v) => v.password === v.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupValues = z.infer<typeof signupSchema>;
