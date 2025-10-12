"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
import { CircleX, Eye, EyeOff, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginValues } from "@/lib/schemas/auth"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// shadcn form helpers
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [formError, setFormError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (values: LoginValues) => {
    setFormError(null)

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })


    if (response?.ok) {
      location.href = callbackUrl
    } else {
      setFormError("Something went wrong")
    }
  }

  return <>
   {/* <div>
      <h1 className="text-4xl">يابن الفاااااااااجر</h1>
    </div> */}
    <div className="flex items-center justify-center md:min-h-screen">
      
      <Card className="w-full border-none max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading font-bold">Login</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
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

              <div className="flex justify-end">
                <Link href="/forget-password" className="text-sm text-blue-600 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Don’t have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Create yours
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  </>
   

}
