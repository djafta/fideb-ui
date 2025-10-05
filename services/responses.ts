import { api } from "@/services/api";

export type Responses = {
  data: {
    request: {
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
      status: string;
      operation: string;
      businessCode: string; // UUID
    }
  }[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
};

export async function getResponses(skip: number, take: number, query: string | undefined) {
  if (query) {
    const response = await api.get<Responses>(`/responses?skip=${ skip }&take=${ take }&${ query }`);
    return ({
      data: response.data.data,
      pagination: response.data.pagination,
    });
  }

  const response = await api.get<Responses>(`/requests?skip=${ skip }&take=${ take }`);
  return ({
    data: response.data.data,
    pagination: response.data.pagination,
  });
}
