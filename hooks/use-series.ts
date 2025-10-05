import { useQuery } from "@tanstack/react-query";
import { getDiscountsSeries } from "@/services/series";

export function useSeries() {
  const { data, isLoading } = useQuery({
    queryKey: ["series"],
    queryFn: () => getDiscountsSeries(),
  });

  return {
    data,
    isLoading
  };
}
