import { useQuery } from "@tanstack/react-query";
import { getResponses } from "@/services/responses";

export function useResponses(skip: number = 0, take: number = 10, query?: string) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["responses", skip, take, query],
        queryFn: () => getResponses(skip, take, query),
    });

    return {
        responses: data?.data || [],
        pagination: data?.pagination || { page: 1, size: take, total: 0 },
        isLoading,
        isError,
    };
}