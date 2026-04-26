import { useQuery } from "@tanstack/react-query";
import getMyInternshipsAction from "../actions/getMyInternshipsAction";
import type { InternshipQueryStatus } from "../actions/getMyInternshipsAction";

type UseGetMyInternshipsParams = {
  page?: number;
  limit?: number;
  status?: InternshipQueryStatus;
};

export default function useGetMyInternships({
  page = 1,
  limit = 10,
  status,
}: UseGetMyInternshipsParams = {}) {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["my-internships", page, limit, status ?? "all"],
    queryFn: () => getMyInternshipsAction({ page, limit, status }),
  });

  return { data, error, isLoading, isError, refetch, isFetching };
}
