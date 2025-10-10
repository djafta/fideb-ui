'use client'
import * as React from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DataTable } from "@/components/data-table";
import { formatMonthYear, formatNumber } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useResponses } from "@/hooks/use-responses";
import { ResponseInfoCard } from "@/components/response-info-card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/ui/components/dialog";

const situations: { [key: string]: string } = {
  "successfully": "bem sucedidas",
  "pending": "pendentes",
  "rejected": "de rejeição",
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
    name: "Operação",
    key: "operation",
    formatData: (value: string) => (
      <div>
        { operations[value.toUpperCase()] }
      </div>
    ),
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
  const query = `status=${ type === "successfully" ? 100 : type === "pending" ? 300 : -1 }`
  const { responses, pagination, isLoading } = useResponses(state.page * state.size, state.size, query);
  const [selectedResponse, setSelectedResponse] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const actionsColumn = {
    name: "",
    key: "actions",
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    ),
    formatData: (value: any) => (
      <div className={ "text-right" }>
        <Button onClick={ () => {
          setSelectedResponse(value);
          setIsDialogOpen(true);
        } } variant={ "ghost" }><Eye className={ "stroke-red-500" }/></Button>
      </div>
    )
  }

  const statusColumn = {
    name: "Estado",
    key: "status",
    formatHeader: (name: string) => (
      <div className={ "text-right" }>
        { name }
      </div>
    ),
    formatData: (value: string) => (
      <Badge variant={ "outline" }>
        { value }
      </Badge>
    )
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2 px-6">
      <div className="flex flex-col bg-white w-full">
        <h1 className="text-2xl font-semibold">Respostas { situations[type.toLowerCase()] }</h1>
      </div>
      <div className="flex items-center">
        <DataTable
          height={ "max-h-[calc(100vh-220px)]" }
          columns={ columns.concat(type === "rejected" ? [statusColumn, actionsColumn] : [statusColumn]) }
          data={ (responses || []).map((response, index) => ({
            ...response.request.discount,
            id: response.request.businessCode + index,
            operation: response.request.operation,
            businessCode: response.request.businessCode,
            status: response.payload?.status,
            actions: response
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
      <Dialog modal={ true } open={ isDialogOpen } onOpenChange={ (open) => setIsDialogOpen(open) }>
        <DialogContent className={ "!w-5xl !max-w-5xl" }>
          <DialogTitle>
          </DialogTitle>
          <DialogBody>
            <ResponseInfoCard data={ selectedResponse }/>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </div>
  )
}
