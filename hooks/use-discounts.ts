import { useQuery } from "@tanstack/react-query";
import { filterDiscounts, getDiscounts } from "@/services/discounts";

export function useDiscounts(skip: number = 0, take: number = 10, situation?: string, query?: string) {

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["discounts", skip, take, situation, query],
    queryFn: () => (!query || query.length == 0) ? getDiscounts(skip, take, situation) : filterDiscounts(skip, take, query),
  });

  return {
    discounts: data?.data || [],
    pagination: data?.pagination || { page: 1, size: take, total: 0 },
    isLoading,
    isError,
    refetch
  };
}