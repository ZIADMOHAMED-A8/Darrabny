import { useQuery } from "@tanstack/react-query";
import getLoginStudentAction from "../actions/getLoginStudentAction";

export default function useGetLoginStudent() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["getLoginStudent"],
    queryFn: () => getLoginStudentAction(),
  });

  return { data, error, isLoading, isError, refetch };
}
