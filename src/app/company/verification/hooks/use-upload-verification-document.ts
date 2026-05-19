// hooks/use-upload-verification-document.ts

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import uploadVerificationDocumentAction from "../actions/upload-verification-document.action";

export function useUploadVerificationDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) =>
      uploadVerificationDocumentAction(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-verification"],
      });
    },
  });
}