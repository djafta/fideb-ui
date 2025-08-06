import { api } from "@/services/api";

export type Discounts = {
    data: {
        id: number
        branch: number
        manager: string
        entity: string
        client: string
        organization: string
        nuit: number
        reference: string
        value: number
        status: string
    }[],
    pagination: {
        page: number
        size: number
        total: number
    }
}

export function getDiscounts(skip: number, take: number, situation: string | undefined) {
    if (situation) {
        return api.get<Discounts>(`/discounts?skip=${ skip }&take=${ take }&situation=${ situation }`).then((response) => ({
            data: response.data.data,
            pagination: response.data.pagination,
        }))
    }
}
