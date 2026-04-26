import { useQuery } from "@tanstack/react-query";
import getResumeAction from "../_actions/getResumeAction";

export default function useGetResume() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["resume"],
    queryFn: () => getResumeAction(),
  });

  return { data, error, isLoading, isError, refetch };
}
