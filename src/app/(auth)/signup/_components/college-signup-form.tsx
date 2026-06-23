"use client";

import * as React from "react";
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Plus, Trash2 } from "lucide-react";

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
      departments: [{ name: "", head: "" }],
    },
    mode: "onSubmit",
  });

  const { fields, append, remove } = useFieldArray<
    CollegeSignupValues,
    "departments"
  >({
    control: form.control,
    name: "departments",
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
  <div>
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

        <div className="space-y-3 rounded-[16px] border border-black/10 bg-slate-50/80 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-[#0B2A4A]">
                Departments
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Add one or more departments for this college.
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={() => append({ name: "", head: "" })}
              className="h-10 rounded-[12px] bg-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`departments.${index}.name` as const}
                    render={({ field: departmentField }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...departmentField}
                            placeholder={`Department ${index + 1}`}
                            className={INPUT}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name={`departments.${index}.head` as const}
                    render={({ field: departmentHeadField }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...departmentHeadField}
                            placeholder={`Head of Department ${index + 1}`}
                            className={INPUT}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    if (fields.length > 1) {
                      remove(index);
                    } else {
                      form.setValue("departments", [{ name: "", head: "" }], {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }
                  }}
                  className="mt-2 h-12 rounded-[12px] border-black/10 bg-white px-3"
                  aria-label={`Remove department ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

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
