"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReportAction } from "../_actions/add-report.action";

const MONITORING_QUERY_KEY = ["monitoringData"];

type AddReportPayload = {
  performanceScore: number;
  attendance: number;
  feedback: string;
  placementId: string;
};

export function useAddReport() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, data } = useMutation<
    unknown,
    Error,
    AddReportPayload
  >({
    mutationFn: (payload) => addReportAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MONITORING_QUERY_KEY });
    },
  });

  return {
    addReport: mutate,
    isPending,
    isError,
    error,
    data,
  };
}
