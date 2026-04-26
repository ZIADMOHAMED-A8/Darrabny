import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateProfileAction, { UpdateProfilePayload } from "../actions/updateProfileAction";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation<
    unknown,
    Error,
    UpdateProfilePayload
  >({
    mutationFn: (values: UpdateProfilePayload) =>
      updateProfileAction(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });

  return { isPending, error, updateProfile: mutateAsync };
}
