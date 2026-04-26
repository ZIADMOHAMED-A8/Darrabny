import { useQuery } from "@tanstack/react-query";
import getSkillsAction from "../_actions/getSkillsAction";

export default function useGetSkills() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["skills"],
    queryFn: () => getSkillsAction(),
  });

  return { data, error, isLoading, isError, refetch };
}
