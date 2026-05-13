import { useQuery } from "@tanstack/react-query";
import getSavedInternshipsAction from "../actions/getSavedInternshipsAction";

export const SAVED_INTERNSHIPS_QUERY_KEY = ["saved-internships"] as const;

function coerceArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;

  if (payload && typeof payload === "object") {
    const data = (payload as { data?: unknown }).data;

    if (Array.isArray(data)) return data;
  }

  return [];
}

export default function useGetSavedInternships() {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: SAVED_INTERNSHIPS_QUERY_KEY,
    queryFn: () => getSavedInternshipsAction(),
    select: (payload) => coerceArray(payload),
  });

  return { data, error, isLoading, isError, refetch, isFetching };
}
