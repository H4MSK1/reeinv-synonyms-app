import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api-client";
import { Synonym } from "@/types";

async function createSynonym(values: Synonym): Promise<Synonym> {
  const { data } = await apiClient.post<Synonym>("/synonyms", values);
  return data;
}

export const useCreateSynonym = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSynonym,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["synonym"],
      }),
  });
};
