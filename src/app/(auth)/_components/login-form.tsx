"use client";

// ✅ React + Next.js imports
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

// ✅ UI + validation imports
import {
  Mail,
  Lock,
  CircleX,
  Eye,
  EyeOff,
  Loader2,
  Github,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/lib/schemas/auth";

// ✅ ShadCN UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

export default function LoginForm() {
  // 🔹 Local states for error & password visibility
  const [formError, setFormError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Setup React Hook Form with Zod validation
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // 🔹 Handle form submit
  const onSubmit = async (values: LoginValues) => {
    setFormError(null);

    // 🧠 Use NextAuth credentials provider
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false, // prevent full page reload
    });

    // ✅ Success → redirect to home
    if (response?.ok) {
      location.href = "/";
    } else {
      // ❌ Invalid credentials → show error message
      setFormError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center">
      {/* 🧱 Login card container */}
      <Card className="w-full max-w-md bg-card rounded-2xl shadow-sm">
        {/* 🔹 Header section */}
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-foreground">
            Login
          </CardTitle>
        </CardHeader>

        {/* 🧩 Main form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* 📨 Email field */}
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
                          className="pl-10 bg-card text-foreground border border-border rounded-xl focus:ring-2 focus:ring-primary/30 focus-visible:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 🔒 Password field with show/hide toggle */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          autoComplete="current-password"
                          className="pl-10 pr-10 bg-card text-foreground border border-border rounded-xl focus:ring-2 focus:ring-primary/30 focus-visible:ring-primary"
                          {...field}
                        />
                        {/* 👁 Toggle password visibility */}
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
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

              {/* ⚠️ Error message (invalid login) */}
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

              {/* 🧠 Remember + Forgot Password */}
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary/30"
                  />
                  Remember me
                </label>
                <Link
                  href="/forget-password"
                  className="text-sm text-primary font-medium hover:opacity-80"
                >
                  Forgot your password?
                </Link>
              </div>
            </CardContent>

            {/* 🔹 Footer: buttons & social login */}
            <CardFooter className="flex flex-col gap-3">
              {/* 🚀 Submit button */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-primary hover:bg-primary/90 transition"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </Button>

              {/* Divider */}
              <div className="flex items-center gap-4 w-full">
                <div className="h-px flex-1 bg-muted" />
                <span className="text-xs text-muted-foreground">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-muted" />
              </div>

              {/* 🌐 Social logins (OAuth) */}
              <div className="grid grid-cols-2 gap-3 w-full">
                {/* Google */}
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl border border-border bg-card text-foreground hover:bg-primary/10 flex items-center justify-center gap-2"
                  onClick={() => signIn("google")}
                >
                  {/* Google Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-4 w-4"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.94 0 6.64 1.7 8.16 3.13l6-6C34.89 3.52 29.92 1.5 24 1.5 14.81 1.5 7.02 6.95 3.44 14.66l7.25 5.63C12.09 14.91 17.52 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.08 24.52c0-1.63-.15-3.19-.43-4.7H24v9.05h12.45c-.54 2.93-2.19 5.42-4.69 7.1l7.25 5.62C43.75 37.45 46.08 31.44 46.08 24.52z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M10.69 28.35c-.48-1.42-.74-2.94-.74-4.49s.26-3.07.74-4.49L3.44 13.7C1.9 17.1 1 20.93 1 24.86c0 3.93.9 7.76 2.44 11.16l7.25-5.67z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M24 46.2c6.53 0 12.03-2.15 16.03-5.86l-7.25-5.62c-2 1.33-4.57 2.12-8.78 2.12-6.48 0-11.91-5.41-13.3-12.48l-7.25 5.67C7.02 41.05 14.81 46.2 24 46.2z"
                    />
                  </svg>
                  Google
                </Button>

                {/* GitHub */}
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl border border-border bg-card text-foreground hover:bg-primary/10 flex items-center justify-center gap-2"
                  onClick={() => signIn("github")}
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </div>

              {/* 🧭 Navigation: Sign up link */}
              <p className="text-sm text-center text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary font-medium hover:opacity-80"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
