import { useQuery } from "@tanstack/react-query";
import { getDiscounts } from "@/services/discounts";

export function useDiscounts() {
    const discounts = useQuery({
        queryKey: ["discounts-by-situation"],
        queryFn: () => getDiscounts(),
    })
    return {

    }
}
