import { useQuery } from "@tanstack/react-query";
import { getDiscounts } from "@/services/discounts";

export function useDiscounts(skip: number = 0, take: number = 10, situation?: string) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["discounts-by-situation", skip, take, situation],
        queryFn: () => getDiscounts(skip, take, situation),
    });

    return {
        discounts: data?.data || [],
        pagination: data?.pagination || { page: 1, size: take, total: 0 },
        isLoading,
        error,
    };
}