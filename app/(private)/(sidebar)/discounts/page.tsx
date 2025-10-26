'use client'
import * as React from "react";
import { useEffect, useState } from "react";
import { useDiscounts } from "@/hooks/use-discounts";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { cn, formatMonthYear, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Discount } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, ExternalLink, Pen, Send } from "lucide-react";
import Link from "next/link";
import { PrivateComponent } from "@/components/private-component";
import { resendDiscount } from "@/services/discounts";
import { Spinner } from "@/components/ui/spinner";

const situations: { [key: string]: string } = {
  "PENDING_ACTION": "Rejeitados",
  "PENDING_FIXING": "Por fixar",
  "PENDING_CANCELLATION": "Por cancelar",
  "PENDING_UPDATE": "Por actualizar",
  "FIXED": "Fixados",
  "CANCELLED": "Cancelados",
  "NOT_FIXED": "Não fixados",
  "NOT_CANCELED": "Não cancelados",
  "NOT_UPDATED": "Não atualizados",
  "PENDING": "Pendentes",
  "INVALID": "Inválidos",
  "PENDING_FIXING,PENDING_UPDATE,PENDING_CANCELLATION": "Pendentes",
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
    key: "entity"
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

const situationColumn = {
  name: "Situação",
  key: "situation",
  formatHeader: (name: string) => (
    <div className={ "text-center" }>
      { name }
    </div>
  ),
  formatData: (value: string) => {
    const situations: { [key: string]: string } = {
      "PENDING_ACTION": "Rejeitado",
      "PENDING_FIXING": "Pendente de fixação",
      "PENDING_CANCELLATION": "Pendente de cancelamento",
      "PENDING_UPDATE": "Pendente de actualização",
      "FIXED": "Fixado",
      "CANCELLED": "Cancelado",
      "NOT_FIXED": "Para fixação",
      "NOT_CANCELED": "Para cancelamento",
      "NOT_UPDATED": "Para actualização",
      "PENDING": "Pendente",
      "INVALID": "Inválido",
    }
    return (
      <Badge variant={ value === "PENDING_ACTION" ? "destructive" : "outline" }
             className={ cn("text-right", { "text-sidebar-primary": value !== "PENDING_ACTION" }) }>
        {
          situations[value.trim().toUpperCase()]
        }
      </Badge>
    )
  }
}

export default function Page() {
  const [state, setState] = useState({
    page: 0,
    size: 20,
    columns: [...columns.map((column) => column.key)]
  });

  const [loadingDiscounts, setLoadingDiscounts] = useState<number[]>([]);

  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const situation = searchParams.get("situation") as string;
  const {
    discounts,
    pagination,
    isLoading,
    refetch
  } = useDiscounts(state.page * state.size, state.size, situation, query);

  const actionsColumn = {
    name: "",
    key: "discount",
    formatData: (value: Discount) => {
      if (loadingDiscounts.includes(value.reference)) {
        return <Spinner/>
      }
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className={ "h-5 w-3" } variant="ghost">
              <EllipsisVertical/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className={ "me-10" }>
            <DropdownMenuItem>
              <Link
                className={ "flex items-center gap-2" }
                href={ `${ process.env.NEXT_PUBLIC_APP_URL }/discounts/${ value.reference }` } target="_blank">
                <ExternalLink/> Ver detalhes
              </Link>
            </DropdownMenuItem>
            {
              (value.situation === "FIXED" || value.situation == "PENDING_ACTION" && value.fixedAt !== null) && (
                <PrivateComponent roles={ ["FIDEB_ACT"] }>
                  <DropdownMenuItem>
                    <Link className={ "flex items-center gap-2" }
                          href={ `${ process.env.NEXT_PUBLIC_APP_URL }/discounts/${ value.reference }/edit` }>
                      <Pen/> Actualizar
                    </Link>
                  </DropdownMenuItem>
                </PrivateComponent>
              )
            }
            {
              value.situation === "PENDING_ACTION" && (
                <PrivateComponent roles={ ["FIDEB_PEN"] }>
                  <DropdownMenuItem onClick={ () => {
                    setLoadingDiscounts((prevState) => [...prevState, value.reference])
                    resendDiscount(value.reference)
                      .then((response) => {
                        if (response.status === 200) refetch();
                      })
                      .finally(() => {
                        setLoadingDiscounts((prevState) => prevState.filter((discountReference) => discountReference !== value.reference))
                      })
                  } }><Send/> Reenviar</DropdownMenuItem>
                </PrivateComponent>
              )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }

  useEffect(() => {
    setQuery("");
  }, [situation]);

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 px-6">
      <div className="flex flex-col bg-white w-full">
        <h1
          className="text-2xl font-semibold text-sidebar-primary">Descontos { situation && situations[situation.toUpperCase()] }</h1>
      </div>
      <div className="flex items-center">
        <DataTable
          height={ "max-h-[calc(100vh-220px)]" }
          columns={
            // @ts-expect-error Properties missing in the type 'Column<Discount>[]' but required in type 'Column<Discount>[]'.
            columns.concat(situation ? [] : [situationColumn]).concat(actionsColumn)
          }
          data={ discounts.map((discount) => ({
            ...discount,
            id: discount.reference,
            discount
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
          excludeFilters={ [situation && "situation"] }
          onFilterChange={ (filter) => {
            if (situation) {
              setQuery(`${ filter }&situation=${ situation }`);
            } else {
              setQuery(filter);
            }
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
  )
}
