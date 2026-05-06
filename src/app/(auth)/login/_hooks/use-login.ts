"use client";

import { LoginValues } from "@/lib/schemas/auth/login.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export function useLogin() {
  const { mutate, error, isPending, reset } = useMutation({
    mutationFn: async (values: LoginValues) => {
      console.log(values);

      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      console.log(response);

      if (response?.error) {
        throw new Error(response.error || "Login failed");
      }

      const callbackUrl = new URLSearchParams(location.search).get(
        "callbackUrl",
      );

      const redirectTo =
        values.role === "company"
          ? "/company/dashboard"
          : values.role === "college"
            ? "/college/dashboard"
            : "/";

      window.location.href = callbackUrl || redirectTo;
    },
  });

  return { login: mutate, error, isPending, reset };
}
