"use client"

// ✅ React & Next imports
import { useState } from "react"
import Link from "next/link"
import { CircleX, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// ✅ UI components (ShadCN)
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

// ✅ Validation + action logic
import { registerSchema, RegisterValues } from "@/lib/schemas/auth"
import { createAccountAction } from "../services/auth"

export default function SignupPage() {
  // 🔹 UI states
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // 🔹 React Hook Form setup with Zod validation
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      countryCode: "+20",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  // 🧠 Handle submit logic
  const onSubmit = async (values: RegisterValues) => {
    const response = await createAccountAction(values)

    // ❌ Validation or server error
    if (response?.ok === false) {
      setFormError(response?.message)
      return
    }

    // ✅ Success → redirect to login
    if (response?.ok) {
      location.href = "/login"
    } else {
      setFormError("Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* 🧱 Signup card */}
      <Card className="w-full bg-card border-none">

        {/* 🔹 Header section */}
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-foreground">
            Create your account
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium">
              Log in
            </Link>
          </p>
        </CardHeader>

        {/* 🧩 Form section */}
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>

              {/* 🧠 Account type selector */}
              <FormItem>
                <FormLabel>I am a...</FormLabel>
                <Select>
                  <SelectTrigger className="h-11 bg-muted/20">
                    <SelectValue placeholder="Student" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    sideOffset={8}
                    className="z-[9999] bg-card border border-border shadow-md rounded-lg"
                  >
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>

              {/* 👤 Full name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="h-11 bg-muted/20 focus:bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 📧 Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-11 bg-muted/20 focus:bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 📱 Phone number (code + input) */}
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <div className="flex">
                  {/* Country code selector */}
                  <FormField
                    control={form.control}
                    name="countryCode"
                    render={({ field }) => (
                      <FormItem className="w-32">
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-11 bg-muted/20 rounded-r-none border-r-0">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              sideOffset={8}
                              className="z-[9999] bg-card border border-border shadow-md rounded-lg"
                            >
                              <SelectItem value="+20">🇪🇬 EG (+20)</SelectItem>
                              <SelectItem value="+966">🇸🇦 SA (+966)</SelectItem>
                              <SelectItem value="+971">🇦🇪 AE (+971)</SelectItem>
                              <SelectItem value="+44">🇬🇧 UK (+44)</SelectItem>
                              <SelectItem value="+1">🇺🇸 US (+1)</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* Phone input */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="1012345678"
                            className="h-11 bg-muted/20 focus:bg-white rounded-l-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormItem>

              {/* 🔑 Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="h-11 bg-muted/20 focus:bg-white pr-10"
                          {...field}
                        />
                        {/* 👁 Toggle show/hide password */}
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          onClick={() => setShowPassword((p) => !p)}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 🔒 Confirm password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="new-password"
                          className="h-11 bg-muted/20 focus:bg-white pr-10"
                          {...field}
                        />
                        {/* 👁 Toggle confirm password */}
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                          onClick={() => setShowConfirmPassword((p) => !p)}
                          aria-label="Toggle confirm password visibility"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 🎓 University / Major (optional) */}
              <FormItem>
                <FormLabel>University / Major (Optional)</FormLabel>
                <Input
                  placeholder="State University / Computer Science"
                  className="h-11 bg-muted/20 focus:bg-white"
                />
              </FormItem>

              {/* ⚠️ Error message display */}
              {formError && (
                <div className="relative my-3">
                  <p
                    role="alert"
                    className="p-2 text-sm text-destructive bg-destructive/10 border border-destructive rounded-md text-center"
                  >
                    {formError}
                  </p>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-card text-destructive"
                  >
                    <CircleX className="h-4 w-4" />
                  </span>
                </div>
              )}

              {/* 🚀 Submit button */}
              <Button
                type="submit"
                className="w-full mt-9 h-11 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium "
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
              </Button>

              {/* ℹ️ Small info message */}
              <p className="text-center text-sm text-muted-foreground mt-3">
                You’ll receive an email to verify your account.
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
