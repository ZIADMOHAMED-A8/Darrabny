"use client"

import Link from "next/link"
import { Loader2, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/lib/schemas/auth"
import { forgetPasswordAction } from "../services/auth"

export default function ForgotPasswordPage() {
  // 🧠 Setup form validation using Zod + React Hook Form
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  // 🔹 Submit handler
  const onSubmit = async (values: ForgotPasswordValues) => {
    await forgetPasswordAction(values)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* 🧱 Main Card Container */}
      <Card className="w-full max-w-md bg-card rounded-2xl shadow-sm border-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            Forgot Password
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Don’t worry, we’ll help you recover your account.
          </p>
        </CardHeader>

        {/* 🧩 Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Email address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="pl-10 h-11 bg-muted/20 focus:bg-white rounded-xl"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            {/* Footer Buttons */}
            <CardFooter className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Continue"
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-sm text-primary font-medium hover:underline"
                >
                  Create yours
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
