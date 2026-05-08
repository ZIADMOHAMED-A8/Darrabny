import { useQuery } from "@tanstack/react-query";
import getPendingEndorsementsAction from "../actions/getPendingEndorsementsAction";

export default function useGetPendingEndorsements() {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["pending-endorsements"],
    queryFn: () => getPendingEndorsementsAction(),
  });

  const endorsements = (data?.data ?? []) as unknown[];

  return {
    data,
    endorsements,
    error,
    isLoading,
    isError,
    refetch,
    isFetching,
  };
}

