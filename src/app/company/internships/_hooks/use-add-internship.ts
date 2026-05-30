"use client";

import { useMutation } from "@tanstack/react-query";
import { addInternshipAction } from "../_actions/add-internship.action";


export function useAddInternship() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData: FormData) => addInternshipAction(formData),
  });

  return {
    addInternship: mutate,
    isPending,
    error,
  };
}