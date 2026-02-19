import { z } from "zod";

/*  LOGIN SCHEMA */
export const loginSchema = z.object({
  // userType: z.enum(["trainee", "company"]),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  // remember: z.boolean().optional(),
});

export type LoginValues = z.infer<typeof loginSchema>;
