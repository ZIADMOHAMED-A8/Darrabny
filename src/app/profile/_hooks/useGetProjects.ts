import { useQuery } from "@tanstack/react-query";
import getProjectsAction from "../_actions/getProjectsAction";

export default function useGetProjects() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsAction(),
  });

  return { data, error, isLoading, isError, refetch };
}
