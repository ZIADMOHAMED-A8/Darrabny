"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff, ChevronLeft } from "lucide-react";

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

import { Card, CardContent } from "@/components/ui/card";

import {
  signupSchema,
  SignupValues,
  GENDER,
} from "@/lib/schemas/auth/signup.schema";
import { useRouter } from "next/navigation";
import useSignup from "../_hooks/signup";

export default function CreateAccountForm() {
  const router = useRouter();
  const { mutate, isPending } = useSignup();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      gender: GENDER.MALE,
      DOB: "",
      // role: "Student",
    },
  });

  const onSubmit: SubmitHandler<SignupValues> = (values) => {
    mutate(values, {
      onSuccess: () => setTimeout(() => router.push("/login"), 2000),
      onError: () => {},
    });
  };

  const LABEL = "text-sm font-medium text-[#0B2A4A]";
  const INPUT =
    "mt-2 h-12 rounded-[12px] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20";
  const ICON_BTN =
    "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700";

  return (
    <Card className="w-full max-w-[520px] rounded-[20px] border border-black/10 bg-white/90 shadow-2xl backdrop-blur">
      <CardContent className="px-10 pb-10 pt-9">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5 text-[#0B2A4A]" />
          </button>
          <h2 className="text-3xl font-semibold text-[#0B2A4A]">
            Create Account
          </h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-7 space-y-5"
          >
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
                    <Input
                      {...field}
                      placeholder="01012345678"
                      className={INPUT}
                    />
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
                      onValueChange={(v: "Male" | "Female" | "Other") =>
                        field.onChange(v)
                      }
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

            {/* Role */}
            {/* <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={LABEL}>Role</FormLabel>
                  <FormControl>
                    <Input {...field} className={INPUT} placeholder="Student" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Submit */}
            <Button
              type="submit"
              disabled={
                isPending ||
                (form.formState.isSubmitted && !form.formState.isValid)
              }
              className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE]"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>

            <p className="pt-1 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-semibold text-[#0A79C9] hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
