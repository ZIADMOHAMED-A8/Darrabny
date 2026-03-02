import * as z from "zod";


export const companySignupSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),

  industry: z.string().min(2, "Industry is required"),

  companyEmail: z.string().email("Invalid email"),

  companyPhone: z.string().min(6, "Phone number is required"),

  address: z.string().min(2, "Address is required"),

  description: z.string().min(10, "Description is required"),

  numberOfEmployees: z.object({
    from: z.number().min(1),
    to: z.number().min(1),
  }),

  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
});
export type CompanySignupValues = z.infer<typeof companySignupSchema>;