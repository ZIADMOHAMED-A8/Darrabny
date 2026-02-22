"use client";

import { ResetPasswordApi } from "@/lib/api/forgot-password-flow/reset-password.api";
import { createPasswordValues } from "@/lib/schemas/auth/forgot-password-schema";
import { useMutation } from "@tanstack/react-query";

export const UseReset = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: createPasswordValues) => {
      const res = await ResetPasswordApi(data);

      if (res.code !== 200) {
        throw new Error(res.message || "Something went wrong");
      }

      return res;
    },
  });

  return { mutate, isPending, error };
};
