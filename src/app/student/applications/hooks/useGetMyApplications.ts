import { useQuery } from "@tanstack/react-query";
import getMyApplicationsAction from "../actions/getMyApplicationsAction";
import type { ApplicationQueryStatus } from "../actions/getMyApplicationsAction";

type UseGetMyApplicationsParams = {
  page?: number;
  limit?: number;
  status?: ApplicationQueryStatus;
};

export default function useGetMyApplications({
  page = 1,
  limit = 10,
  status = "all",
}: UseGetMyApplicationsParams = {}) {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["my-applications", page, limit, status],
    queryFn: () => getMyApplicationsAction({ page, limit, status }),
  });

  return { data, error, isLoading, isError, refetch, isFetching };
}
