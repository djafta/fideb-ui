import { api } from "@/services/api";

export type DiscountsStats = {
    data: {
        total: number
        fixed: number
        cancelled: number
        pending: number
        notFixed: number
        notCancelled: number
        pendingAction: number
        success: number
        unanswered: number
    }
}

export function getDiscountsStats() {
    return api.get<DiscountsStats>("/discounts/stats").then((response) => response.data.data)
}
