"use client";

import { LoginValues } from "@/lib/schemas/login.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";


export function useLogin() {
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (values: LoginValues) => {
      // Call NextAuth credentials signIn
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (response?.error) {
        throw new Error(response.error);
      }

      const callbackUrl = new URLSearchParams(location.search).get("callbackUrl");
      window.location.href = callbackUrl || "/";
    },
  });

  return { login: mutate, error, isPending };
}
