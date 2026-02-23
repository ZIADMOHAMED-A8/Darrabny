import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEmail } from "../_hooks/use-email";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  EmailValue,
  useEmailSchema,
} from "@/lib/schemas/auth/forgot-password-schema";
import { useToast } from "@/hooks/use-toast";

// Props
type Props = {
  setEmail: (email: string) => void;
  setStep: (step: "verify" | "createPassword") => void;
};

export default function EmailStep({ setStep, setEmail }: Props) {
  // Form
  const { emailSchema } = useEmailSchema();
  const form = useForm<EmailValue>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  // Toast
  const { toast } = useToast();

  // Mutation
  const { mutate, isPending, error } = useEmail();

  const onSubmit: SubmitHandler<EmailValue> = (value) => {
    mutate(value, {
      onSuccess: () => {
        setEmail(value.email);
        setStep("verify");
        toast({
          title: "Email sent successfully",
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="border-b-2 border-zinc-200 pb-2 mb-8">
          {/* Title */}
          <h1 className="font-inter font-semibold text-2xl">Forgot Password</h1>

          {/* Description */}
          <p className="text-zinc-950 text-base">
            Don’t worry, we’ll send you instructions to help you reset it.
          </p>
        </header>

        {/* Email */}
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-10">
              {/* Email Label */}
              <FormLabel className="font-medium text-base text-zinc-800">
                Email
              </FormLabel>
              <FormControl>
                {/* Email Input */}
                <Input
                  placeholder="user@example.com"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              {/* Feedback message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Continue Button */}
        <Button
          variant="default"
          type="submit"
          disabled={
            isPending || (!form.formState.isValid && form.formState.isSubmitted)
          }
          className="capitalize w-full"
        >
          {isPending ? "Loading..." : "Continue"}
        </Button>

        {/* Error Message */}
        {error?.message && (
          <p className="text-red-500 text-center mt-3">{error.message}</p>
        )}

        {/* Register Navigation */}
        <div className="text-gray-500 text-center mt-9">
          Don’t have an account yet?
          <Link href="/register">
            <span className="text-[#A6252A] font-bold ps-2">
              Create one now
            </span>
          </Link>
        </div>
      </form>
    </Form>
  );
}
