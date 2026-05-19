"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addReportAction,
  type AddReportPayload as AddReportValues,
} from "../_actions/add-report.action";
import { uploadCertificateAction } from "../_actions/upload-certificate.action";

const MONITORING_QUERY_KEY = ["monitoringData"];

type AddReportMutationPayload = {
  internshipId: string;
  data: AddReportValues;
  certificateFile?: File | null;
};

export function useAddReport() {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error, data, reset } = useMutation<
    unknown,
    Error,
    AddReportMutationPayload
  >({
    mutationFn: async ({ internshipId, data, certificateFile }) => {
      let certificateUrl = data.certificateUrl;

      if (certificateFile) {
        const certificateFormData = new FormData();
        certificateFormData.set("file", certificateFile);

        const uploadResult = await uploadCertificateAction(certificateFormData);

        if (!uploadResult.success) {
          console.error("[useAddReport] certificate upload failed", uploadResult);
          throw new Error(uploadResult.error);
        }

        certificateUrl = uploadResult.url;
      }

      const result = await addReportAction(internshipId, {
        ...data,
        ...(certificateUrl ? { certificateUrl } : {}),
      });

      if (!result.success) {
        console.error("[useAddReport] add report failed", result);
        throw new Error(result.error);
      }

      return result.data;
    },
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
    reset,
  };
}
