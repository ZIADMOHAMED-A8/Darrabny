"use client"

import { useState } from "react"
import Link from "next/link"
import { CircleX, Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { registerSchema, RegisterValues } from "@/lib/schemas/auth"
import { createAccountAction } from "../services/auth"


export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
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

  const onSubmit = async (values: RegisterValues) => {
    const response = await createAccountAction(values)

    if (response?.ok === false) {
      setFormError(response?.message)
      return
    }

    if (response?.ok) {
      location.href = "/login"
    } else {
      setFormError("Something went wrong")
    }
  }

  return (
    <Card className="w-full !rounded-none !border-0">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-semibold text-gray-900">
          Create Account
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
            {/* First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ahmed"
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Abdullah"
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user123"
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      autoComplete="email"
                      className="h-12 bg-gray-50 border-gray-200 focus:bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone (Country code + number) */}
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <div className="flex">
                <FormField
                  control={form.control}
                  name="countryCode"
                  render={({ field }) => (
                    <FormItem className="w-32">
                      <FormControl>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="h-12 bg-gray-50 border-gray-200 rounded-r-none border-r-0">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="+20">🇪🇬 EG (+20)</SelectItem>
                            <SelectItem value="+1">🇺🇸 US (+1)</SelectItem>
                            <SelectItem value="+44">🇬🇧 UK (+44)</SelectItem>
                            <SelectItem value="+971">🇦🇪 AE (+971)</SelectItem>
                            <SelectItem value="+966">🇸🇦 SA (+966)</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          placeholder="1012345678"
                          className="h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-l-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormItem>

            {/* Password */}
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
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((p) => !p)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
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
                        className="h-12 bg-gray-50 border-gray-200 focus:bg-white pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword((p) => !p)}
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formError && (<div className="relative my-3"> <p role="alert" className="p-2 bg-red-50 text-red-600 text-center text-sm border border-red-600 rounded-md" > {formError} </p>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 inline-flex h-4 w-4 items-center rounded-full justify-center bg-white text-red-600 "
              >
                <CircleX className="h-4 w-4" />
              </span>
            </div>)}


            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium mt-6"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </Form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Login
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
