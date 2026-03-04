import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  role: z.enum(["user", "company", "university"], {
    message: "Role is required",
  }),
});

export type LoginValues = z.infer<typeof loginSchema>;
