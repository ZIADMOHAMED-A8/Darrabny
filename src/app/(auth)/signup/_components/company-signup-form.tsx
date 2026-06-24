"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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
  companySignupSchema,
  CompanySignupValues,
} from "@/lib/schemas/auth/company-signup.schema";

import useCompanySignup from "../_hooks/company-signup";

export default function CompanySignupForm() {
  const { mutate, isPending, error, reset } = useCompanySignup();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const form = useForm<CompanySignupValues>({
    resolver: zodResolver(companySignupSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyPhone: "",
      industry: "",
      address: "",
      description: "",
      numberOfEmployees: {
        from: 0,
        to: 0,
      },
    },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<CompanySignupValues> = (values) => {
    reset();
    mutate({
      ...values,
      numberOfEmployees: {
        from: values.numberOfEmployees.from,
        to: values.numberOfEmployees.to,
      },
    });
  };

  const LABEL = "text-sm font-medium text-[#0B2A4A]";
  const INPUT =
    "mt-2 h-12 rounded-[12px] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Global server error */}
        {error && (
          <div className="text-red-600">
            {error.message}
          </div>
        )}

        {/* Company Name + Industry */}
        <div className="grid gap-5 md:grid-cols-2">
          <FormField
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL}>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Google" className={INPUT} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={LABEL}>Industry</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Technology"
                    className={INPUT}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Company Email */}
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Company Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="google@company.com"
                  className={INPUT}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone (companyPhone) */}
        <FormField
          name="companyPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Phone</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="+201012345678"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
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

        {/* Address */}
        <FormField
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Address</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Cairo" className={INPUT} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className={LABEL}>Description</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tell us about your company..."
                  className={INPUT}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Employees */}
        <div className="space-y-2">
          <FormLabel className={LABEL}>Number of Employees</FormLabel>

          <div className="flex flex-wrap items-start gap-3">
            <div className="min-w-[160px]">
              <FormField
                name="numberOfEmployees.from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-500">
                      From
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="150"
                        className="h-12 rounded-[12px] border-black/10 bg-white"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? 0 : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="min-w-[160px]">
              <FormField
                name="numberOfEmployees.to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-slate-500">To</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="260"
                        className="h-12 rounded-[12px] border-black/10 bg-white"
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === "" ? 0 : Number(e.target.value),
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

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
