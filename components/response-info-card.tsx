import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CalendarDays, CheckCircle, CreditCard, User } from "lucide-react"
import { formatNumber } from "@/lib/utils";

interface ResponseData {
  request: {
    discount: {
      reference: number
      nuit: number
      organization: string
      amount: number
      startDate: string
      endDate: string
      createdAt: string
      updatedAt: string
      situation: string
      entity: string
      client: number
      manager: string
      branch: string
    }
    operation: string
    businessCode: string
  }
  statusCode: string
  createdAt: string
  updatedAt: string
  payload: {
    operatingType: string
    bankReference: string
    reason?: string
    organicCode: string
    status: string
    deductionCode: string
    startDate: string
    discountValue: string
    endDate: string
    employeeNuit: string
  }
}

interface ResponseInfoCardProps {
  data: ResponseData | undefined
}

const discountSituations: { [key: string]: string } = {
  "PENDING_ACTION": "Rejeitado",
  "FIXED": "Fixado",
  "CANCELLED": "Cancelado",
  "NOT_FIXED": "Não Fixado",
  "NOT_CANCELED": "Não Cancelado",
  "NOT_UPDATED": "Não Atualizado",
}

const requestOperations: { [key: string]: string } = {
  "C": "Fixação",
  "U": "Actualização",
  "D": "Cancelamento"
}

export function ResponseInfoCard({ data }: ResponseInfoCardProps) {
  if (!data) {
    return <></>
  }
  const { request, payload, statusCode } = data

  // Get status info
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "100":
        return {
          label: "Aprovado",
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-green-600",
        }
      case "300":
        return {
          label: "Suspenso",
          variant: "destructive" as const,
          icon: AlertCircle,
          color: "text-red-600",
        }
      default:
        return {
          label: `${ status }`,
          variant: "secondary" as const,
          icon: AlertCircle,
          color: "text-sidebar-primary",
        }
    }
  }

  const statusInfo = getStatusInfo(payload.status)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold"><span className={"text-sidebar-primary"}>Referência</span> #{ request.discount.reference }</CardTitle>
          <div
            className={ "flex items-center gap-10 font-medium text-sm" + (statusCode === "100" ? " text-green-600" : " text-sidebar-primary") }>
            <div className={"flex items-center gap-1" }>
              Operação:
              <Badge variant={ "outline" } className="flex items-center">
                { requestOperations[request.operation] }
              </Badge>
            </div>
            <div className={"flex items-center gap-1" }>
              Estado:
              <Badge variant={ "outline" } className="flex items-center">
                { statusInfo.label }
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Employee Information */ }
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <User className="h-4 w-4"/>
            Informações do cliente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Balcão:</span>
              <p className="font-mono">{ request.discount.branch }</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Cliente:</span>
              <p className="font-mono">{ request.discount.client }</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Gestor:</span>
              <p>{ request.discount.manager.trim() }</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Entidade:</span>
              <p className="font-medium">{ request.discount.entity.trim() }</p>
            </div>
          </div>
        </div>

        <Separator/>

        {/* Banking Information */ }
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <CreditCard className="h-4 w-4"/>
            Informações do Desconto
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">NUIT:</span>
              <p className="font-mono">{ request.discount.nuit }</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Orgânico:</span>
              <p className="font-mono">{ request.discount.organization }</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Valor:</span>
              <p className="font-medium">{ formatNumber(request.discount.amount) } MZN</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Situação actual:</span>
              <p className="font-medium">{ discountSituations[request.discount.situation] }</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Data Início:</span>
              <p>{
                new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "numeric",
                }).format(new Date(request.discount.startDate))
              }</p>
            </div>
            <div>
              <span className="font-medium text-muted-foreground">Data Fim:</span>
              <p>{
                new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "numeric",
                }).format(new Date(request.discount.endDate))
              }</p>
            </div>
          </div>
        </div>

        {/* Reason - Only show if exists (status !== '100') */ }
        { payload.reason && (
          <>
            <Separator/>
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <AlertCircle className={ `h-4 w-4 ${ statusInfo.color }` }/>
                Motivo
              </h3>
              <div className="bg-muted p-4 rounded-lg">
                <p
                  className="text-sm leading-relaxed text-red-500">{ new TextDecoder("latin1").decode(Buffer.from(payload.reason)) }</p>
              </div>
            </div>
          </>
        ) }

        <Separator/>

        {/* Timestamps */ }
        <div className="space-y-3">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <CalendarDays className="h-4 w-4"/>
            Datas do Sistema
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-muted-foreground">Resposta recebida em:</span>
              <p>
                { new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(new Date(data.updatedAt)) }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
