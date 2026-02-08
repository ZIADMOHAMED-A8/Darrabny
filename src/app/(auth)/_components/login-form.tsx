"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, Lock, Mail, Github, Chrome } from "lucide-react";
/* ================= TYPES ================= */
type UserType = "trainee" | "company";
const schema = z.object({
  userType: z.enum(["trainee", "company"]),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  remember: z.boolean().optional(),
});
type FormValues = z.infer<typeof schema>;
type Props = {
  defaultUserType?: UserType;
  onSubmit?: (data: FormValues) => void;
  onForgotPassword?: () => void;
  onGoogle?: () => void;
  onGithub?: () => void;
  onSignUp?: () => void;
};
export default function LoginFormCard({
  defaultUserType = "trainee",
  onSubmit,
  onForgotPassword,
  onGoogle,
  onGithub,
  onSignUp,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      userType: defaultUserType,
      email: "",
      password: "",
      remember: false,
    },
  });

  const userType = watch("userType");

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
              setValue("userType", value as UserType)
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
        <form
          onSubmit={handleSubmit((data) => onSubmit?.(data))}
          className="mt-7 space-y-5"
        >
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#0B2A4A]">
              Email address
            </label>

            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                {...register("email")}
                placeholder="you@example.com"
                className="h-12 rounded-[12px] pl-11 border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
              />
            </div>

            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#0B2A4A]">
              Password
            </label>

            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 rounded-[12px] pl-11 pr-11 border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
              />

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

            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <Checkbox
                checked={watch("remember")}
                onCheckedChange={(v: boolean | "indeterminate") =>
                  setValue("remember", v === true)
                }
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
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE]"
          >
            Sign in
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
              <Chrome className="mr-2 h-5 w-5" />
              Google
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={onGithub}
              className="h-12 rounded-[12px] bg-white border border-black/10"
            >
              <Github className="mr-2 h-5 w-5" />
              GitHub
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
      </CardContent>
    </Card>
  );
}
