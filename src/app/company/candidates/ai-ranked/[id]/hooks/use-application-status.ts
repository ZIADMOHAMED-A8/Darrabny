"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateApplicationStatusAction from "../actions/get-application-status.action";

export function useApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "accepted" | "rejected" | "pending";
    }) => updateApplicationStatusAction(id, status),

    onSuccess: (_, variables) => {
      // نعمل refetch لل details بعد التحديث
      queryClient.invalidateQueries({
        queryKey: ["application-details", variables.id],
      });
    },
  });
}