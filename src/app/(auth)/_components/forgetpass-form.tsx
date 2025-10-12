"use client"

import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
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
// import { ForgotPasswordValues } from "@/lib/types/auth"

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  })

  const onSubmit = async (values: ForgotPasswordValues) => {
    await forgetPasswordAction(values)
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full border-none max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-heading font-bold">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-base">
            Don’t worry, we will help you recover your account.
          </CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full rounded-none bg-blue-600 hover:bg-blue-700 text-white"
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

              <div className="flex justify-between text-sm text-center text-gray-600">
                <p className="text-sm text-center text-muted-foreground">
                  Don’t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:underline"
                  >
                    Create yours
                  </Link>
                </p>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
