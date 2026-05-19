"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteInternshipAction } from "../_actions/delete-internship.action";

export function useDeleteInternship() {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (id: string) => deleteInternshipAction(id),
  });

  return {
    deleteInternship: mutate,
    isPending,
    error,
  };
}
