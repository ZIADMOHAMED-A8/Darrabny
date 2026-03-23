"use client";

import { useMutation } from "@tanstack/react-query";
import { addInternshipAction } from "../_actions/add-internship.action";


export function useAddInternship() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: addInternshipAction,
  });

  return {
    addInternship: mutate,
    isPending,
    error,
  };
}