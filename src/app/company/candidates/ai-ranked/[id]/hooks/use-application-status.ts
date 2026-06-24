"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateApplicationStatusAction from "../actions/get-application-status.action";
import { applicationDetailsQueryKey } from "./use-application-details";

export function useApplicationStatus(internshipId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "accepted" | "rejected" | "pending";
    }) => updateApplicationStatusAction(id, status),

    onSuccess: async () => {
      // نعمل refetch لل details بعد التحديث
      await queryClient.invalidateQueries({
        queryKey: applicationDetailsQueryKey(internshipId),
      });
    },
  });
}
