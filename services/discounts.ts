import { api } from "@/services/api";
import { Discount } from "@/lib/types";

export type Discounts = {
  data: {
    amount: number;
    branch: string;
    client: number;
    createdAt: Date;
    endDate: string;
    entity: string;
    manager: string;
    nuit: number;
    organization: string;
    reference: number;
    situation: string;
    startDate: string;
    updatedAt: Date;
  }[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
};

export function getDiscounts(skip: number, take: number, situation: string | undefined) {
  if (situation) {
    return api.get<Discounts>(`/discounts?skip=${ skip }&take=${ take }&situation=${ situation }`).then((response) => ({
      data: response.data.data,
      pagination: response.data.pagination,
    }))
  }

  return api.get<Discounts>(`/discounts?skip=${ skip }&take=${ take }`).then((response) => ({
    data: response.data.data,
    pagination: response.data.pagination,
  }))
}


export function filterDiscounts(skip: number, take: number, query: string | undefined) {
  return api.get<Discounts>(`/discounts?skip=${ skip }&take=${ take }&${ query }`).then((response) => ({
    data: response.data.data,
    pagination: response.data.pagination,
  }))
}

export function resendDiscount(reference: number) {
  return api.put(`/discounts/${ reference }`, {
    resend: true,
  })
}

export function updateDiscount(reference: number, discount: Discount) {
  return api.put(`/discounts/${ reference }`, {
    reference,
    discount
  })
}
