import { useQuery } from "@tanstack/react-query";
import { getRequests } from "@/services/requests";

export function useRequests(skip: number = 0, take: number = 10, type?: string) {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["requests-by-type", skip, take, type],
        queryFn: () => getRequests(skip, take, type),
    });

    return {
        requests: data?.data || [],
        pagination: data?.pagination || { page: 1, size: take, total: 0 },
        isLoading,
        isError,
    };
}