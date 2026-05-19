"use client";

import { useMutation } from "@tanstack/react-query";
import { updateInternshipAction } from "../_actions/update-internship.action";


export function useUpdateInternship() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: FormData;
    }) => updateInternshipAction(id, data),
  });

  return {
    updateInternship: mutate,
    isPending,
    error,
  };
}