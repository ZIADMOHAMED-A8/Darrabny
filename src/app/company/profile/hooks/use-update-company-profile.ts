"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateCompanyProfileAction from "../actions/update-company-profile.action";

export function useUpdateCompanyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyProfileAction,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-profile"],
      });
    },
  });
}