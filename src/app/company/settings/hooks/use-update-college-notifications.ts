"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateCollegeNotificationsAction,
  type UpdateCollegeNotificationsPayload,
} from "../actions/update-college-notifications.action";
import { COLLEGE_SETTINGS_QUERY_KEY } from "./use-get-college-settings";

export function useUpdateCollegeNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCollegeNotificationsPayload) =>
      updateCollegeNotificationsAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COLLEGE_SETTINGS_QUERY_KEY });
    },
  });
}
