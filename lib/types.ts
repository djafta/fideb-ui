export type Discount = {
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
  fixedAt: Date | null
};