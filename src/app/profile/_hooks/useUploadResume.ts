import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadResumeAction from "../_actions/uploadResumeAction";

export type UploadResumePayload = {
  file: File;
  localUrl?: string;
};

type ResumeCache = {
  fileName: string;
  url: string;
  updatedAt: string;
};

export default function useUploadResume() {
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation<
    unknown,
    Error,
    UploadResumePayload,
    { prevResume: unknown; prevGetResume: unknown }
  >({
    mutationFn: async ({ file }: UploadResumePayload) => {
      const formData = new FormData();
      formData.append("attachment", file);
      return uploadResumeAction(formData);
    },
    onMutate: async ({ file, localUrl }) => {
      await queryClient.cancelQueries({ queryKey: ["resume"] });
      await queryClient.cancelQueries({ queryKey: ["getResume"] });

      const prevResume = queryClient.getQueryData(["resume"]);
      const prevGetResume = queryClient.getQueryData(["getResume"]);

      const optimisticResume: ResumeCache = {
        fileName: file.name,
        url: localUrl || "",
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData(["resume"], optimisticResume);
      queryClient.setQueryData(["getResume"], optimisticResume);

      return { prevResume, prevGetResume };
    },
    onError: (_error, _values, context) => {
      if (!context) return;
      queryClient.setQueryData(["resume"], context.prevResume);
      queryClient.setQueryData(["getResume"], context.prevGetResume);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
      queryClient.invalidateQueries({ queryKey: ["getResume"] });
    },
  });

  return { isPending, error, uploadResume: mutateAsync };
}
