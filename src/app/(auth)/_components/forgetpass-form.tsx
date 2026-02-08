"use client";

import Link from "next/link";
import { Loader2, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  forgotPasswordSchema,
  ForgotPasswordValues,
} from "@/lib/schemas/forgot-password-schema";

export default function ForgotPasswordPage() {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: ForgotPasswordValues) => {
    // await forgetPasswordAction(values)
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-[520px] rounded-2xl border border-black/10 bg-white shadow-[0_25px_60px_-25px_rgba(15,23,42,.25)]">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-semibold leading-tight text-[#0B2A4A]">
            Forgot Password
          </CardTitle>
          <p className="mt-3 text-sm text-slate-500">
            Don’t worry, we’ll help you recover your account.
          </p>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 px-10 pt-4 pb-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-slate-800">
                      Email address
                    </FormLabel>

                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          className={[
                            "h-12 rounded-xl pl-12",
                            "bg-[#F6F9FF] text-slate-900 placeholder:text-slate-400",
                            "border border-slate-200",
                            "focus-visible:ring-4 focus-visible:ring-[#0A79C9]/15 focus-visible:border-[#0A79C9]",
                          ].join(" ")}
                          {...field}
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex flex-col gap-5 px-10 pb-10 pt-3">
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#0A79C9] hover:bg-[#0868AE] text-white font-medium transition"
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

              <div className="text-center text-sm text-slate-500">
                Don’t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-sm text-[#0A79C9] font-semibold hover:underline"
                >
                  Create yours
                </Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
