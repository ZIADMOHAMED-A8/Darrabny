"use client";

import * as React from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { signupSchema, SignupValues } from "@/lib/schemas/signup.schema";

const COUNTRY_CODES = [
  { value: "EG(+20)", label: "EG(+20)" },
  { value: "SA(+966)", label: "SA(+966)" },
  { value: "AE(+971)", label: "AE(+971)" },
];

type Props = {
  onSubmit?: (values: SignupValues) => void;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

export default function CreateAccountForm({ onSubmit }: Props) {
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "Ahmed",
      lastName: "Abdullah",
      username: "user123",
      email: "user@enternlink.com",
      countryCode: "EG(+20)",
      phone: "1012345678",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <Card className="w-full max-w-[520px] rounded-[20px] border border-black/10 bg-white/90 shadow-2xl backdrop-blur">
      <CardContent className="px-10 pb-10 pt-9">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5 text-[#0B2A4A]" />
          </button>

          <h2 className="text-3xl font-semibold text-[#0B2A4A]">
            Create Account
          </h2>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit((v) => onSubmit?.(v))}
          className="mt-7 space-y-5"
        >
          {/* First + Last */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label className="text-sm font-medium text-[#0B2A4A]">
                First name
              </Label>
              <Input
                {...register("firstName")}
                placeholder="Ahmed"
                className="mt-2 h-12 rounded-[12px] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
              />
              <FieldError message={errors.firstName?.message} />
            </div>

            <div>
              <Label className="text-sm font-medium text-[#0B2A4A]">
                Last name
              </Label>
              <Input
                {...register("lastName")}
                placeholder="Abdullah"
                className="mt-2 h-12 rounded-[12px] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
              />
              <FieldError message={errors.lastName?.message} />
            </div>
          </div>

          {/* Username */}
          <div>
            <Label className="text-sm font-medium text-[#0B2A4A]">
              Username
            </Label>
            <Input
              {...register("username")}
              placeholder="user123"
              className="mt-2 h-12 rounded-[12px] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
            />
            <FieldError message={errors.username?.message} />
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm font-medium text-[#0B2A4A]">Email</Label>
            <Input
              {...register("email")}
              placeholder="user@enternlink.com"
              className="mt-2 h-12 rounded-[12px] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
            />
            <FieldError message={errors.email?.message} />
          </div>

          {/* Phone */}
          <div>
            <Label className="text-sm font-medium text-[#0B2A4A]">Phone</Label>

            <div className="mt-2 grid grid-cols-[120px_1fr] overflow-hidden rounded-[12px] border border-black/10 bg-white">
              <div className="border-r border-black/10 bg-[#F3F5F9]">
                <Controller
                  control={control}
                  name="countryCode"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-12 rounded-none border-0 bg-transparent focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_CODES.map((c) => (
                          <SelectItem key={c.value} value={c.value}>
                            {c.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Input
                {...register("phone")}
                placeholder="1012345678"
                className="h-12 rounded-none border-0 bg-transparent focus-visible:ring-0"
              />
            </div>

            <FieldError
              message={errors.countryCode?.message || errors.phone?.message}
            />
          </div>

          {/* Password */}
          <div>
            <Label className="text-sm font-medium text-[#0B2A4A]">
              Password
            </Label>

            <div className="relative mt-2">
              <Input
                {...register("password")}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 rounded-[12px] border-black/10 bg-white pr-11 focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
              />

              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPass ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <FieldError message={errors.password?.message} />
          </div>

          {/* Confirm Password */}
          <div>
            <Label className="text-sm font-medium text-[#0B2A4A]">
              Confirm Password
            </Label>

            <div className="relative mt-2">
              <Input
                {...register("confirmPassword")}
                type={showConfirm ? "text" : "password"}
                placeholder="••••••••"
                className="h-12 rounded-[12px] border-black/10 bg-white pr-11 focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
              />

              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <FieldError message={errors.confirmPassword?.message} />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE]"
          >
            Create Account
          </Button>

          {/* Footer */}
          <p className="pt-2 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#0A79C9] hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
