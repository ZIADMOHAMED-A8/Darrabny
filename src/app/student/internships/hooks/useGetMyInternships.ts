import { useQuery } from "@tanstack/react-query";
import getMyInternshipsAction from "../actions/getMyInternshipsAction";

type UseGetMyInternshipsParams = {
  page?: number;
  limit?: number;
};

export default function useGetMyInternships({
  page = 1,
  limit = 10,
}: UseGetMyInternshipsParams = {}) {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["my-internships", page, limit],
    queryFn: () => getMyInternshipsAction({ page, limit }),
  });

  return { data, error, isLoading, isError, refetch, isFetching };
}
