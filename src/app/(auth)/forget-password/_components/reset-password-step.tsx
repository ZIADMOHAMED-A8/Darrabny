import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseReset } from "../_hooks/use-reset";
import { ResetData } from "@/lib/types/forgot-password";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  createPasswordValues,
  usePasswordValues,
} from "@/lib/schemas/auth/forgot-password-schema";
import { PasswordInput } from "@/components/ui/password-input";
import SubmissionMessage from "@/components/shared/submission-message";

// Props
type Props = {
  email: string;
};

export default function ResetPasswordStep({ email }: Props) {
  // Navigate
  const router = useRouter();

  // Schema
  const { passwordValues } = usePasswordValues();

  // Form
  const form = useForm<createPasswordValues>({
    resolver: zodResolver(passwordValues),
    defaultValues: {
      email: email,
      newPassword: "",
      rePassword: "",
    },
  });

  // Mutation
  const { error, isPending, mutate: reset } = UseReset();

  // Function
  const onSubmit: SubmitHandler<createPasswordValues> = (values) => {
    // Transform form data to match API expectations
    const payload: ResetData = {
      email: values.email,
      newPassword: values.newPassword,
    };
    const payloadSender = {
      email: payload.email,
      newPassword: payload.newPassword,
      rePassword: payload.newPassword,
    };

    // Router
    reset(payloadSender, {
      // Show success toast
      onSuccess: () => {
        router.push("/");
        toast({
          title: "Your password has been successfully reset",
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[25.375rem]">
        {/* Email */}
        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-4">
              {/* Form Label */}
              <FormLabel>Password</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="********"
                  type="password"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          name="rePassword"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-2.5">
              {/* Form Label */}
              <FormLabel>Confirm Password</FormLabel>

              {/* Field */}
              <FormControl>
                <PasswordInput
                  {...field}
                  placeholder="********"
                  type="password"
                />
              </FormControl>

              {/* Feedback */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Message  */}
        <SubmissionMessage>{error?.message}</SubmissionMessage>

        {/* Reset Button */}
        <Button
          variant="default"
          type="submit"
          disabled={
            isPending || (!form.formState.isValid && form.formState.isSubmitted)
          }
          className="capitalize w-full mt-9"
        >
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
