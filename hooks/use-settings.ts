import { useMutation, useQuery } from "@tanstack/react-query";
import { getSettings, saveSetting, Setting } from "@/services/settings";

export function useSettings() {

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["settings",],
    queryFn: () => getSettings(),
  });

  const mutation = useMutation({
    mutationKey: ["settings"],
    mutationFn: (variables: Setting) => saveSetting(variables),
    onSuccess: () => {
      refetch();
    },
  });

  return {
    settings: data?.data,
    refetch,
    isLoading,
    isError,
    mutation
  };
}