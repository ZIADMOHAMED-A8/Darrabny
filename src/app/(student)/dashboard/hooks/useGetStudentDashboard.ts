import { useQuery } from "@tanstack/react-query";
import getStudentDashboardAction from "../actions/getStudentDashboardAction";

type UseGetStudentDashboardParams = {
  activeLimit?: number;
  savedLimit?: number;
};

export default function useGetStudentDashboard({
  activeLimit = 5,
  savedLimit = 5,
}: UseGetStudentDashboardParams = {}) {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["student-dashboard", activeLimit, savedLimit],
    queryFn: () => getStudentDashboardAction({ activeLimit, savedLimit }),
  });

  return { data, error, isLoading, isError, refetch, isFetching };
}

