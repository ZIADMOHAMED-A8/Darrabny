import { useQuery } from "@tanstack/react-query";
import getLoginUserAction from "../actions/getLoginUserAction";

export default function useGetUser() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => getLoginUserAction(),
  });

  return { isLoading, error, data };
}
