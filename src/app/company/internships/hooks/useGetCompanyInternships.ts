import { useQuery } from "@tanstack/react-query";
import getCompanyInternshipsAction from "../actions/getCompanyInternshipsAction";
import type { CompanyInternshipQueryStatus } from "../actions/getCompanyInternshipsAction";

type UseGetCompanyInternshipsParams = {
  page?: number;
  limit?: number;
  status?: CompanyInternshipQueryStatus;
};

export default function useGetCompanyInternships({
  page = 1,
  limit = 10,
  status = "all",
}: UseGetCompanyInternshipsParams = {}) {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["company-internships", page, limit, status],
    queryFn: () => getCompanyInternshipsAction({ page, limit,status  }),
  });

  return { data, error, isLoading, isError, refetch, isFetching };
}
