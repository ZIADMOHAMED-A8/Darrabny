import { useMutation, useQueryClient } from "@tanstack/react-query";
import respondToEndorsementRequestAction, {
  type EndorsementDecision,
} from "../actions/respondToEndorsementRequestAction";

export default function useRespondToEndorsementRequest() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, decision }: { id: string; decision: EndorsementDecision }) =>
      respondToEndorsementRequestAction({ id, decision }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["pending-endorsements"] });
    },
  });

  return mutation;
}

