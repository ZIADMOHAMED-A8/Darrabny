"use client";

import * as React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  collegeSignupSchema,
  type CollegeSignupValues,
  type CollegeSignupRequestValues,
} from "@/lib/schemas/auth/college-signup.schema";

import useCollegeSignup from "../_hooks/college-signup";

export default function CollegeSignupForm() {
  const router = useRouter();
  const { mutate, isPending, error, reset } = useCollegeSignup();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm<CollegeSignupValues>({
    resolver: zodResolver(collegeSignupSchema),
    defaultValues: {
      collegeName: "",
      collegeEmail: "",
      password: "",
      confirmPassword: "",
      address: "",
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<CollegeSignupValues> = (values) => {
    reset();

    mutate(values as CollegeSignupRequestValues, {
      onSuccess: () => {
        router.push("/login?role=college&signup=success");
      },
    });
  };

  const LABEL = "text-sm font-medium text-[#0B2A4A]";
  const INPUT =
    "mt-2 h-12 rounded-[12px] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20";
  const ICON_BTN =
    "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      {error && (
  <div className="text-red-600">
    {error.message}
  </div>
)}

        <FormField
          control={form.control}
          name="collegeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>College Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cairo College"
                  className={INPUT}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="collegeEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>College Email</FormLabel>
              <div className="relative mt-2">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="info@college.edu"
                    className="h-12 rounded-[12px] border-black/10 bg-white pl-11 focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
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
              <FormLabel className={LABEL}>Password</FormLabel>
              <div className="relative mt-2">
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${INPUT} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((state) => !state)}
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Confirm Password</FormLabel>
              <div className="relative mt-2">
                <Input
                  {...field}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${INPUT} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((state) => !state)}
                  className={ICON_BTN}
                  aria-label="Toggle confirm password"
                >
                  {showConfirmPassword ? (
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

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Address</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Cairo, Egypt"
                  className={INPUT}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isPending}
          className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE]"
        >
          {isPending ? "Creating account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  );
}
