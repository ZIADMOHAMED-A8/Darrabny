"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotificationSettingsAction } from "../_actions/update-notification-settings.action";

const COMPANY_SETTINGS_QUERY_KEY = ["companySettings"];

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, data } = useMutation({
    mutationFn: (payload) => updateNotificationSettingsAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANY_SETTINGS_QUERY_KEY });
    },
  });

  return {
    updateNotificationSettings: mutate,
    isPending,
    isError,
    error,
    data,
  };
}
