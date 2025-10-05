import { api } from "@/services/api";

export type Requests = {
  data: {
    discount: {
      reference: number;
      nuit: number;
      organization: string;
      amount: number;
      startDate: string; // ISO YYYY-MM-DD
      endDate: string;   // ISO YYYY-MM-DD
      createdAt: string; // ISO with milliseconds
      updatedAt: string; // ISO with milliseconds
      situation: string;
      entity: string | null;
      client: number;
      manager: string | null;
      branch: string | null;
    };
    operation: string;
    businessCode: string; // UUID
  }[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
};

export function getRequests(skip: number, take: number, type: string | undefined) {
  if (type) {
    return api.get<Requests>(`/requests?skip=${ skip }&take=${ take }&type=${ type }`).then((response) => ({
      data: response.data.data,
      pagination: response.data.pagination,
    }))
  }

  return api.get<Requests>(`/requests?skip=${ skip }&take=${ take }`).then((response) => ({
    data: response.data.data,
    pagination: response.data.pagination,
  }))
}
