import { api } from "@/services/api";

export type DiscountSeries = {
  pending: number
  pendingAction: number
  success: number
  unanswered: number
  createdAt: Date
}

export type DiscountsSeries = {
  data: DiscountSeries[]
}

export function getDiscountsSeries() {
  return api.get<DiscountsSeries>("/discounts/series").then((response) => response.data.data)
}
