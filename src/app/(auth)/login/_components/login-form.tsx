"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Lock, Mail, Github, Chrome } from "lucide-react";

import { useLogin } from "../_hooks/use-login";
import { loginSchema, LoginValues } from "@/lib/schemas/login.schema";
import SubmissionMessage from "../../_components/submission-message";

/* ================= TYPES ================= */
type UserType = "trainee" | "company";

type Props = {
  defaultUserType?: UserType;
  onForgotPassword?: () => void;
  onGoogle?: () => void;
  onGithub?: () => void;
  onSignUp?: () => void;
};

export default function LoginFormCard({
  defaultUserType = "trainee",
  onForgotPassword,
  onGoogle,
  onGithub,
  onSignUp,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const { login, isPending, error } = useLogin();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userType: defaultUserType,
      email: "",
      password: "",
      remember: false,
    },
  });

  const userType = form.watch("userType");

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    login(data);
  };

  return (
    <Card className="w-full max-w-[520px] rounded-[20px] border border-black/10 bg-white/90 shadow-2xl backdrop-blur">
      <CardContent className="px-10 pb-10 pt-9">
        <h2 className="text-center text-3xl font-semibold text-[#0B2A4A]">
          Login
        </h2>

        {/* Tabs */}
        <div className="mt-4 flex justify-center">
          <Tabs
            value={userType}
            onValueChange={(value: string) =>
              form.setValue("userType", value as UserType)
            }
          >
            <TabsList className="h-auto bg-transparent p-0">
              <div className="flex items-center gap-4 text-lg">
                <TabsTrigger
                  value="trainee"
                  className={`h-auto bg-transparent px-0 py-0 text-base font-medium ${
                    userType === "trainee"
                      ? "text-[#0A79C9] underline underline-offset-[10px]"
                      : "text-slate-500"
                  }`}
                >
                  Trainee
                </TabsTrigger>

                <span className="text-slate-400">|</span>

                <TabsTrigger
                  value="company"
                  className={`h-auto bg-transparent px-0 py-0 text-base font-medium ${
                    userType === "company"
                      ? "text-[#0A79C9] underline underline-offset-[10px]"
                      : "text-slate-500"
                  }`}
                >
                  Company
                </TabsTrigger>
              </div>
            </TabsList>
          </Tabs>
        </div>

        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-7 space-y-5"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <label className="text-sm font-medium text-[#0B2A4A]">
                    Email address
                  </label>

                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="you@example.com"
                        className="h-12 rounded-[12px] pl-11 border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
                      />
                    </FormControl>
                  </div>

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
                  <label className="text-sm font-medium text-[#0B2A4A]">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="h-12 rounded-[12px] pl-11 pr-11 border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
                      />
                    </FormControl>

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember */}
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-[#0A79C9] hover:underline"
                  >
                    Forgot password?
                  </button>
                </FormItem>
              )}
            />

            {/* Global Error */}
            <SubmissionMessage>{error?.message}</SubmissionMessage>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE]"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            {/* Divider */}
            <div className="my-2 flex items-center gap-3">
              <Separator className="flex-1 bg-black/10" />
              <span className="text-xs text-slate-400">OR CONTINUE WITH</span>
              <Separator className="flex-1 bg-black/10" />
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={onGoogle}
                className="h-12 rounded-[12px] bg-white border border-black/10"
              >
                <Chrome className="mr-2 h-5 w-5" /> Google
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={onGithub}
                className="h-12 rounded-[12px] bg-white border border-black/10"
              >
                <Github className="mr-2 h-5 w-5" /> GitHub
              </Button>
            </div>

            {/* Footer */}
            <p className="pt-2 text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onSignUp}
                className="font-semibold text-[#0A79C9] hover:underline"
              >
                Sign up
              </button>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
