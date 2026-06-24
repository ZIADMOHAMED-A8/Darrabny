"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Lock, Mail, Github, Chrome } from "lucide-react";

import { useLogin } from "../_hooks/use-login";
import { loginSchema, LoginValues } from "@/lib/schemas/auth/login.schema";
import type { Role } from "@/lib/types/signup";
import Link from "next/link";

type Props = {
  onForgotPassword?: () => void;
  onGithub?: () => void;
  initialRole?: Role;
};

export default function LoginFormCard({
  onForgotPassword,
  onGithub,
  initialRole = "user",
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isPending, error, reset } = useLogin();
  const [role, setRole] = useState<Role>(initialRole);
  const ICON_BTN =
    "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700";

  const changeRole = (selectedRole: Role) => {
    setRole(selectedRole);
  };

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: initialRole,
    },
  });

  const onSubmit: SubmitHandler<LoginValues> = (data) => {
    reset();
    login({
      ...data,
      role,
    });
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {});
  };

  return (
    <Card className="w-full max-w-[520px] rounded-[20px] border border-black/10 bg-white/90 shadow-2xl backdrop-blur">
      <CardContent className="px-10 pb-10 pt-9">
        <div>
          <h2 className="text-center text-3xl font-semibold text-[#0B2A4A] mb-2">
            Login
          </h2>

          <div className="flex items-center justify-center gap-4 py-3 text-sm font-medium">
            <button
              type="button"
              onClick={() => changeRole("user")}
              className={`text-sm font-medium pb-1 transition-all duration-200 ${
                role === "user"
                  ? "text-[#0A79C9] border-b-2 border-[#0A79C9]"
                  : "text-slate-400 hover:text-[#0B2A4A]"
              }`}
            >
              User
            </button>

            <span className="text-slate-300">|</span>

            <button
              type="button"
              onClick={() => changeRole("company")}
              className={`text-sm font-medium pb-1 transition-all duration-200 ${
                role === "company"
                  ? "text-[#0A79C9] border-b-2 border-[#0A79C9]"
                  : "text-slate-400 hover:text-[#0B2A4A]"
              }`}
            >
              Company
            </button>

            <span className="text-slate-300">|</span>

            <button
              type="button"
              onClick={() => changeRole("college")}
              className={`text-sm font-medium pb-1 transition-all duration-200 ${
                role === "college"
                  ? "text-[#0A79C9] border-b-2 border-[#0A79C9]"
                  : "text-slate-400 hover:text-[#0B2A4A]"
              }`}
            >
              College
            </button>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#0B2A4A]">
                    Email address
                  </FormLabel>
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

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-[#0B2A4A]">
                    Password
                  </FormLabel>
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
                      className={ICON_BTN}
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

            <div className="flex justify-between">
            <Button
                type="button"
                className="text-sm text-[#0A79C9] hover:underline bg-transparent shadow-none p-0 h-auto"
              >
                <Link href="/signup">Create an account</Link>
                
              </Button>
            <Button
  asChild
  type="button"
  className="text-sm text-[#0A79C9] hover:underline bg-transparent shadow-none p-0 h-auto"
>
  <Link href="/forget-password">
    Forgot password?
  </Link>
</Button>
            </div>

            {error ? (
              <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {(error as any)?.message || "An unexpected error occurred"}
              </div>
            ) : null}

            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE]"
            >
              {isPending ? "Logging in..." : "Login"}
            </Button>

            {/* <div className="my-2 flex items-center gap-3">
              <Separator className="flex-1 bg-black/10" />
              <span className="text-xs text-slate-400">OR CONTINUE WITH</span>
              <Separator className="flex-1 bg-black/10" />
            </div> */}

            {/* <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleGoogleLogin}
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
            </div> */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
