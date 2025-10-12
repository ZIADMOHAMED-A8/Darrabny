// lib/schemas/auth.ts
import { z } from "zod"

export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }).nonempty( "Email is required."),
  password: z.string("Password is required.").nonempty("Password is required."),
})

export type LoginValues = z.infer<typeof loginSchema>


export const forgotPasswordSchema = z.object({
    email: z.email({ message: "Please enter a valid email." }).nonempty( "Email is required."),
  })

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>


const PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
const EGY_LOCAL_PHONE_REGEX = /^01[0125][0-9]{8}$/
export const registerSchema = z
.object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    username: z.string().trim().min(3, "Username must be at least 3 characters."),
    email: z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email({ message: "Please enter a valid email." }),

    countryCode: z.enum(["+20", "+1", "+44", "+971", "+966"], {
      message: "Select a country code.",
    }),

    phone: z
      .string()
      .trim()
      .regex(EGY_LOCAL_PHONE_REGEX, "Enter a valid Egyptian mobile: e.g. 010xxxxxxxx"),

    password: z
      .string()
      .regex(
        PASSWORD_REGEX,
        "Password must be 8+ chars with uppercase, lowercase, number and special character."
      ),

    confirmPassword: z.string().min(1, "Please confirm your password."),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  })


export type RegisterValues = z.infer<typeof registerSchema>