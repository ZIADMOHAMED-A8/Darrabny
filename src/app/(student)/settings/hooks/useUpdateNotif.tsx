import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateNotifAction, { UpdateNotifPayload } from "../actions/UpdateNotifAction";

export default function useUpdateNotif() {
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation<
    unknown,
    Error,
    UpdateNotifPayload
  >({
    mutationFn: (values: UpdateNotifPayload) => updateNotifAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] });
    },
  });

  return { isPending, error, updateNotif: mutateAsync };
}
