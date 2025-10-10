'use client'
import * as React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { formatMonthYear, formatNumber } from "@/lib/utils";
import { useRequests } from "@/hooks/use-requests";
import { Badge } from "@/components/ui/badge";

const situations: { [key: string]: string } = {
  "sent": "Enviados",
  "pending": "Pendentes",
  "answered": "Respondidos",
}

const operations: { [key: string]: string } = {
  "C": "Fixação",
  "D": "Cancelamento",
  "U": "Atualização"
}

const columns = [
  {
    name: "Data",
    key: "createdAt",
    formatData: (value: string) => {
      const date = new Date(value);
      const formatted = date.toLocaleString("pt-MZ", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });

      return (
        <Badge variant="outline">
          { formatted }
        </Badge>
      );
    },
    formatHeader: (name: string) => (
      <div>
        { name }
      </div>
    )
  },
  {
    name: "Balcão",
    key: "branch",
    formatData: (value: number) => (
      <div className={ "text-right" }>
        { value }
      </div>
    ),
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    )
  },
  {
    name: "Gestor",
    key: "manager"
  },
  {
    name: "Cliente",
    key: "client",
    formatData: (value: number) => (
      <div className={ "text-right" }>
        { value }
      </div>
    ),
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    )
  },
  {
    name: "Entidade",
    key: "entity"
  },
  {
    name: "Operação",
    key: "operation",
    formatData: (value: string) => (
      <div>
        { operations[value.toUpperCase()] }
      </div>
    ),
  },
  {
    name: "NUIT",
    key: "nuit",
    formatData: (value: number) => (
      <div className={ "text-right" }>
        { value }
      </div>
    ),
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    )
  },
  {
    name: "Orgânico",
    key: "organization"
  },
  {
    name: "Referência",
    key: "reference",
    formatData: (value: number) => (
      <div className={ "text-right" }>
        { value }
      </div>
    ),
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    )
  },
  {
    name: "Valor",
    key: "amount",
    formatData: (value: number) => (
      <div className={ "text-right" }>
        {
          formatNumber(value)
        }
      </div>
    ),
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    )
  },
  {
    name: "Data Início",
    key: "startDate",
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    ),
    formatData: (value: string) => (
      <div className={ "text-right" }>
        {
          formatMonthYear(value)
        }
      </div>
    )
  },
  {
    name: "Data Fim",
    key: "endDate",
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    ),
    formatData: (value: string) => (
      <div className={ "text-right" }>
        {
          formatMonthYear(value)
        }
      </div>
    )
  },
]
export default function Page() {
  const [state, setState] = useState({
    page: 0,
    size: 20,
    columns: [...columns.map((column) => column.key)]
  });
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as string;
  const { requests, pagination, isLoading } = useRequests(state.page * state.size, state.size, type);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 px-6">
      <div className="flex flex-col bg-white w-full">
        <h1 className="text-2xl font-semibold">Pedidos { situations[type.toLowerCase()] }</h1>
      </div>
      <div className="flex items-center">
        <DataTable
          height={ "max-h-[calc(100vh-220px)]" }
          columns={ columns }
          data={ requests.map((request, index) => ({
            ...request.discount,
            id: request.discount.reference + index,
            operation: request.operation,
            businessCode: request.businessCode,
          })) }
          pagination={ pagination }
          isLoading={ isLoading }
          onPageChange={ (page) => {
            setState((prevState) => ({
              ...prevState,
              page
            }))
          } }
          onPageSizeChange={
            (size) => {
              setState((prevState) => ({
                ...prevState,
                size,
              }))
            }
          }
          onColumnsChange={ (columns) => {
            setState((prevState) => ({
              ...prevState,
              columns
            }))
          } }
        />
      </div>
    </div>
  )
}
