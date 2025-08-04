import { getDiscountsStats } from "@/services/stats";
import { useQuery } from "@tanstack/react-query";

export function useStats() {
    const discountsStats = useQuery({
        queryKey: ["stats"],
        queryFn: () => getDiscountsStats(),
    });

    return {
        discountsStats
    };
}
