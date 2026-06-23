"use client";

import { useMutation } from "@tanstack/react-query";
import { signupCollegeAction } from "../_actions/signup-college.action";

export default function useCollegeSignup() {
  const { mutate, isPending, error, reset, data, isError, isSuccess } = useMutation({
    mutationFn: (data)=>signupCollegeAction(data),
  });

  return {
    mutate,
    isPending,
    error,
    reset,
    data,
    isError,
    isSuccess,
  };
}