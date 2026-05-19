import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateFullNameAction, {
  UpdateFullNamePayload,
} from "../actions/updateFullNameAction";

export default function useUpdateFullName() {
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation<
    unknown,
    Error,
    UpdateFullNamePayload
  >({
    mutationFn: (values: UpdateFullNamePayload) => updateFullNameAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
      queryClient.invalidateQueries({ queryKey: ["getLoginStudent"] });
    },
  });

  return { isPending, error, updateFullName: mutateAsync };
}
