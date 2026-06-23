import { z } from "zod";

export const collegeSignupSchema = z.object({
  collegeName: z.string().trim().min(2, "College name is required"),
  collegeEmail: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().trim().min(2, "Address is required"),
  confirmPassword: z
    .string()
    .min(6, "Confirm password must be at least 6 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export type CollegeSignupValues = z.infer<typeof collegeSignupSchema>;

export type CollegeSignupRequestValues = CollegeSignupValues;
