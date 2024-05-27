import { useQuery } from "@tanstack/react-query";
import { Optional, Synonym } from "@/types";
import { apiClient } from "@/lib/api-client";

async function fetchSynonym(word: Optional<string>): Promise<Synonym> {
  const { data } = await apiClient.get<Synonym>(`/api/synonyms/${word}`);
  return data;
}

export const useSynonym = (word: Optional<string>) =>
  useQuery({
    enabled: !!word,
    queryKey: ["synonym", word],
    queryFn: () => fetchSynonym(word),
  });
