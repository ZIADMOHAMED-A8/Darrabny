"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  signupSchema,
  SignupValues,
  GENDER,
} from "@/lib/schemas/auth/signup.schema";
import useSignup from "../_hooks/signup";

export default function UserSignupForm() {
  const { mutate, isPending, error, reset } = useSignup();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      role: "student",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      gender: GENDER.MALE,
      DOB: "",
    },
  });

  const onSubmit: SubmitHandler<SignupValues> = (values) => {
    reset();
    mutate(values);
  };

  const LABEL = "text-sm font-medium text-[#0B2A4A]";
  const INPUT =
    "mt-2 h-12 rounded-[12px] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20";
  const ICON_BTN =
    "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {error ? (
          <div className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {(error as any)?.message || "An unexpected error occurred"}
          </div>
        ) : null}

        {/* First + Last Name */}
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL}>First Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ahmed" className={INPUT} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL}>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ali" className={INPUT} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="user@example.com"
                  className={INPUT}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile Number */}
        <FormField
          name="mobileNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Mobile Number</FormLabel>
              <FormControl>
                <Input {...field} placeholder="01012345678" className={INPUT} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Password</FormLabel>
              <FormControl>
                <div className="relative mt-2">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-[12px] border-black/10 bg-white pr-11 focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className={ICON_BTN}
                    aria-label="Toggle password"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative mt-2">
                  <Input
                    {...field}
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 rounded-[12px] border-black/10 bg-white pr-11 focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className={ICON_BTN}
                    aria-label="Toggle confirm password"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Gender */}
        <FormField
          name="gender"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Gender</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <SelectTrigger className="h-12 rounded-[12px] border-black/10 bg-white">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(GENDER).map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DOB */}
        <FormField
          name="DOB"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Date of Birth</FormLabel>
              <FormControl>
                <Input {...field} type="date" className={INPUT} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE]"
        >
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>
    </Form>
  );
}
