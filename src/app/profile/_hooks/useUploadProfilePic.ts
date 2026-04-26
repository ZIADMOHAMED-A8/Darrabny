import { useMutation, useQueryClient } from "@tanstack/react-query";
import uploadProfilePicAction from "../_actions/uploadProfilePicAction";

export default function useUploadProfilePic() {
  const queryClient = useQueryClient();

  const { isPending, error, mutateAsync } = useMutation<unknown, Error, FormData>({
    mutationFn: (formData: FormData) => uploadProfilePicAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getLoginStudent"] });
      queryClient.invalidateQueries({ queryKey: ["profileData"] });
    },
  });

  return { isPending, error, uploadProfilePic: mutateAsync };
}
