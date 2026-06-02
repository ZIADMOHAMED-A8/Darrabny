"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadCompanyLogoAction from "../actions/upload-company-logo.action";

export function useUploadCompanyLogo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (props: {
      companyId: string;
      formData: FormData;
    }) => uploadCompanyLogoAction(props),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-profile"],
      });
    },
  });
}
