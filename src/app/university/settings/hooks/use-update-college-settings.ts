"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCollegeSettingsAction,
  type UpdateCollegeSettingsPayload,
} from "../actions/update-college-settings.action";
import { COLLEGE_SETTINGS_QUERY_KEY } from "./use-get-college-settings";

export function useUpdateCollegeSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCollegeSettingsPayload) =>
      updateCollegeSettingsAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_SETTINGS_QUERY_KEY });
    },
  });
}
