import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import updateProfileAction, { UpdateProfilePayload } from "./updateProfileAction";

export default function useUpdateProfile() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation<
    unknown,
    Error,
    UpdateProfilePayload
  >({
    mutationFn: (values: UpdateProfilePayload) =>
      updateProfileAction(values, session?.token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });

  return { isPending, error, updateProfile: mutateAsync };
}
