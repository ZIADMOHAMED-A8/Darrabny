"use client";

import { useMutation } from "@tanstack/react-query";
import { CompanySignupValues } from "@/lib/schemas/auth/company-signup.schema";
import { signupCompanyAction } from "../_actions/signup-company.action";

export default function useCompanySignup() {
  const { mutate, isPending, error, reset } = useMutation({
    mutationFn: (values: CompanySignupValues) => signupCompanyAction(values),
  });

  return {
    mutate,
    isPending,
    error,
    reset,
  };
}