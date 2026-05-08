import { useQuery } from "@tanstack/react-query";
import getRecommendedInternshipsAction from "../actions/getRecommendedInternshipsAction";

function coerceArray(payload: unknown): any[] {
  if (Array.isArray(payload)) return payload;

  if (payload && typeof payload === "object") {
    const p = payload as Record<string, unknown>;

    const candidates = [
      p.data,
      p.internships,
      p.recommended,
      p.recommendedInternships,
      p.results,
    ];

    for (const c of candidates) {
      if (Array.isArray(c)) return c;
    }
  }

  return [];
}

export default function useGetRecommendedInternships() {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["recommended-internships"],
    queryFn: () => getRecommendedInternshipsAction(),
    select: (payload) => coerceArray(payload),
  });

  return { data, error, isLoading, isError, refetch, isFetching };
}
