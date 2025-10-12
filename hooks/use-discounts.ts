import { useQuery } from "@tanstack/react-query";
import { filterDiscounts, getDiscountEvents, getDiscounts } from "@/services/discounts";

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

export function useDiscount(reference: number) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["discount", `reference=${ reference }`],
    queryFn: () => filterDiscounts(0, 1, `reference=${ reference }`),
  });

  return {
    discount: data?.data?.[0],
    isLoading,
    isError,
    refetch
  }
}

export function useDiscountEvents(reference: number) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["discount-events-by-reference"],
    queryFn: () => getDiscountEvents(reference),
  })

  return {
    events: data?.data || [],
    isLoading,
    isError,
    refetch
  }
}
