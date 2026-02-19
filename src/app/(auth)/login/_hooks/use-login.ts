"use client";

import { LoginValues } from "@/lib/schemas/auth/login.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export function useLogin() {
  const { mutate, error, isPending } = useMutation({
    mutationFn: async (values: LoginValues) => {
      console.log(values);
      // Call NextAuth credentials signIn
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (response?.error) {
        console.log("response error:::::::::::::::::::::::::::::::::::", response);
        throw new Error("Login failed: unauthorized" );
      }
      console.log("response", response);

      const callbackUrl = new URLSearchParams(location.search).get(
        "callbackUrl",
      );
      window.location.href = callbackUrl || "/";
    },
  });

  return { login: mutate, error, isPending };
}
