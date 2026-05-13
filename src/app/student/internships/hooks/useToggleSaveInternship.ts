import { useMutation, useQueryClient } from "@tanstack/react-query";
import toggleSaveInternshipAction from "../actions/toggleSaveInternshipAction";
import { SAVED_INTERNSHIPS_QUERY_KEY } from "@/app/student/dashboard/hooks/useGetSavedInternships";

export default function useToggleSaveInternship() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation<unknown, Error, string>({
    mutationFn: (internshipId) => toggleSaveInternshipAction(internshipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_INTERNSHIPS_QUERY_KEY });
    },
  });

  return {
    toggleSaveInternship: mutateAsync,
    isPending,
    error,
  };
}
