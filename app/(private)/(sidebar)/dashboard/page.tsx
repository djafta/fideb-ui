'use client';
import { SectionCards } from "@/components/section-charts";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import * as React from "react";
import { useState } from "react";
import { useDiscounts } from "@/hooks/use-discounts";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { formatMonthYear, formatNumber } from "@/lib/utils";

const situations: { [key: string]: string } = {
  "PENDING_ACTION": "Erro do banco",
  "FIXED": "Fixado",
  "CANCELLED": "Cancelado",
  "NOT_FIXED": "Não Fixado",
  "NOT_CANCELED": "Não Cancelado",
  "NOT_UPDATED": "Não Atualizado",
}

const columns = [
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
    key: "entity",
    formatData: (value: string) => (
      <div>
        { value.trim() }
      </div>
    )
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
  {
    name: "Situação",
    key: "situation",
    formatData: (value: string) => {
      return (
        <Badge variant={ 'outline' }>
          { situations[value] }
        </Badge>
      )
    }
  },

]

export default function Page() {
  const [state, setState] = useState({
    page: 0,
    size: 20,
    columns: [...columns.map((column) => column.key)]
  });
  const [query, setQuery] = useState("");
  const {
    discounts,
    pagination,
    isLoading,
    isError
  } = useDiscounts(state.page * state.size, state.size, undefined, query);

  if (isError) {
    toast("Erro ao carregar descontos",
      {
        description: "Não foi possível carregar os descontos. Tente novamente mais tarde.",
        duration: 5000,
      })
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards/>
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive/>
        </div>
        <div className={ "px-6" }>
          <DataTable
            height={ "h-[600px]" }
            columns={ columns }
            data={ discounts.map((discount) => ({
              ...discount,
              id: discount.reference,
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
            onFilterChange={ (filter) => {
              setQuery(filter);
            } }
            onColumnsChange={ (columns) => {
              setState((prevState) => ({
                ...prevState,
                columns
              }))
            } }
          />
        </div>
      </div>
    </div>
  )
}
