"use client"
import { DiscountTimeline } from "@/components/discount-timeline"
import { use } from "react";
import { useDiscounts } from "@/hooks/use-discounts";
import { DiscountInfoCard } from "@/components/discount-info-card";

// Mock data based on the banking system workflow
const mockEvents = [
  {
    type: "proposal",
    id: "1a2b3c4d",
    createdAt: new Date("2024-01-15T10:00:00"),
    description: "Cron job encontrou nova proposta no core bancário",
    payload: {
      nuit: 123456789,
      organization: "BANK001",
      amount: 5000.0,
      reference: "REF123456",
      status: "success",
    },
  },
  {
    type: "creation",
    id: "2b3c4d5e",
    createdAt: new Date("2024-01-15T10:05:00"),
    description: "Novo desconto foi criado no sistema",
    payload: {
      discountId: "DISC001",
      startDate: "2024-01-15",
      endDate: "2024-12-15",
      situation: "CREATED",
      status: "success",
    },
  },
  {
    type: "request",
    id: "3c4d5e6f",
    createdAt: new Date("2024-01-15T10:10:00"),
    description: "Desconto enviado via API Gateway para fixação",
    payload: {
      transactionCode: "TXN001",
      operationType: "C",
      apiEndpoint: "/api/discount/fix",
      deductionCode: "DED001",
      employeeNuit: "123456789",
      discountValue: "5000.00",
      status: "processing",
    },
  },
  {
    type: "response",
    id: "4d5e6f7g",
    createdAt: new Date("2024-01-15T10:15:00"),
    description: "Resposta da API processada com sucesso",
    payload: {
      statusCode: "00",
      responseStatus: "100",
      message: "Discount fixed successfully",
      newSituation: "FIXED",
      status: "success",
    },
  },
  {
    type: "audit",
    id: "5e6f7g8h",
    createdAt: new Date("2024-01-15T10:16:00"),
    description: "Alteração registrada no serviço de auditoria",
    payload: {
      auditId: "AUD001",
      changeType: "STATUS_UPDATE",
      oldValue: "CREATED",
      newValue: "FIXED",
      userId: "system",
      status: "success",
    },
  },
]

export default function HomePage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = use(params);
  const { discounts, isLoading } = useDiscounts(0, 1, undefined, `reference=${ reference }`);

  const discount = discounts[0];

  return (
    <main className="min-h-screen bg-background px-6 py-4 flex flex-col space-y-10">
      <DiscountInfoCard discountInfo={ discount}/>
      <DiscountTimeline discountReference={ reference } events={ mockEvents }/>
    </main>
  )
}
