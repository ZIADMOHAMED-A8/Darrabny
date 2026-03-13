"use client";
import { useMutation } from "@tanstack/react-query";

import { SignupValues } from "@/lib/schemas/auth/signup.schema";
import { signupAction } from "../_actions/signup-user.action";

export default function useSignup() {
  return useMutation({
    mutationFn: (values: SignupValues) => signupAction(values),
  });
}
