"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteCompanyDoc from "../actions/delete-company-document-action";
export default function useDeleteDoc() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCompanyDoc(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-verification"],
      });
    },
  });
}