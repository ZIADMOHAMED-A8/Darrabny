"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompanySettingsAction } from "../_actions/update-company-settings.action";

const COMPANY_SETTINGS_QUERY_KEY = ["companySettings"];

export function useUpdateCompanySettings() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: (payload) => updateCompanySettingsAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANY_SETTINGS_QUERY_KEY });
    },
  });

  return {
    updateCompanySettings: mutate,
    isPending,
    isError,
    error,
    data,
  };
}
