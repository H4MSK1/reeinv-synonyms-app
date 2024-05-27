import { useQuery } from "@tanstack/react-query";
import { Synonym } from "@/types";
import { apiClient } from "@/lib/api-client";

async function fetchSynonyms(searchTerm: string): Promise<Synonym[]> {
  const { data } = await apiClient.get<Synonym[]>(
    `/api/synonyms?search=${searchTerm}`
  );
  return data;
}

export const useSearchSynonyms = (searchTerm: string) =>
  useQuery({
    enabled: searchTerm.length > 0,
    queryKey: ["search-synonyms", searchTerm],
    queryFn: () => fetchSynonyms(searchTerm),
  });
