import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Calendar, DollarSign, Hash, MapPin, User } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/utils";

interface DiscountInfo {
  reference: number
  nuit: number
  organization: string
  amount: number
  startDate: string
  endDate: string
  createdAt: Date
  updatedAt: Date
  situation: string
  entity: string
  client: number
  manager: string
  branch: string
}

interface DiscountInfoCardProps {
  discountInfo?: DiscountInfo
}

const situations: { [key: string]: string } = {
  "PENDING_ACTION": "Rejeitado",
  "FIXED": "Fixado",
  "CANCELLED": "Cancelado",
  "NOT_FIXED": "Não Fixado",
  "NOT_CANCELED": "Não Cancelado",
  "NOT_UPDATED": "Não Atualizado",
}

export function DiscountInfoCard({ discountInfo }: DiscountInfoCardProps) {
  const getSituationColor = (situation: string) => {
    switch (situation) {
      case "ACTIVE":
        return "bg-green-100 text-green-800 border-green-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200"
      case "FIXED":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "CREATED":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  if (!discountInfo) {
    return <DiscountInfoSkeleton/>
  }

  return (
    <Card className="w-full border-green-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-green-800 flex items-center gap-2">
            Referência #{ discountInfo.reference }
          </CardTitle>
          <Badge className={ `px-3 py-1 font-semibold ${ getSituationColor(discountInfo.situation) }` }>
            { situations[discountInfo.situation] }
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Informações Principais */ }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
            <div>
              <p className="text-sm text-gray-600">NUIT</p>
              <p className="font-semibold text-green-800">{ discountInfo.nuit }</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
            <div>
              <p className="text-sm text-gray-600">Orgânico</p>
              <p className="font-semibold text-green-800">{ discountInfo.organization }</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
            <div>
              <p className="text-sm text-gray-600">Valor</p>
              <p className="font-semibold text-green-800">{ formatNumber(discountInfo.amount) } MZN</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
            <div>
              <p className="text-sm text-gray-600">Data Início</p>
              <p className="font-medium text-gray-800">{
                new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "numeric",
                }).format(new Date(discountInfo.startDate))
              }</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
            <div>
              <p className="text-sm text-gray-600">Data Fim</p>
              <p className="font-medium text-gray-800">{
                new Intl.DateTimeFormat("pt-PT", {
                  year: "numeric",
                  month: "numeric",
                }).format(new Date(discountInfo.endDate))
              }</p>
            </div>
          </div>
        </div>

        {/* Informações do Cliente */ }
        <div className="bg-white/60 rounded-lg border border-green-100 p-4">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <User className="h-4 w-4"/>
            Informações do Cliente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-2">
              <div>
                <p className="text-sm text-gray-600">Balcão</p>
                <p className="font-medium text-gray-800">{ discountInfo.branch }</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cliente</p>
              <p className="font-medium text-gray-800">{ discountInfo.client }</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gestor</p>
              <p className="font-medium text-gray-800">{ discountInfo.manager.trim() }</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Entidade</p>
              <p className="font-medium text-gray-800">{ discountInfo.entity.trim() }</p>
            </div>
          </div>
        </div>

        {/* Datas */ }
        <div className="bg-white/60 rounded-lg border border-green-100 p-4">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4"/>
            Período e Datas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Criado em</p>
              <p className="font-medium text-gray-800">{ formatDate(discountInfo.createdAt.toString()) }</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Atualizado em</p>
              <p className="font-medium text-gray-800">{ formatDate(discountInfo.updatedAt.toString()) }</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DiscountInfoSkeleton() {
  return (
    <Card className="w-full border-green-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="h-6 w-6 text-green-600"/>
            <Skeleton className="h-8 w-48"/>
          </div>
          <Skeleton className="h-6 w-20 rounded-full"/>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Informações Principais */ }
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
            <DollarSign className="h-5 w-5 text-green-600"/>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Valor</p>
              <Skeleton className="h-5 w-24"/>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
            <Building2 className="h-5 w-5 text-green-600"/>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">NUIT</p>
              <Skeleton className="h-5 w-20"/>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg border border-green-100">
            <Hash className="h-5 w-5 text-green-600"/>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Organização</p>
              <Skeleton className="h-5 w-16"/>
            </div>
          </div>
        </div>

        {/* Informações do Cliente */ }
        <div className="bg-white/60 rounded-lg border border-green-100 p-4">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <User className="h-4 w-4"/>
            Informações do Cliente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Entidade</p>
              <Skeleton className="h-5 w-full"/>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Cliente</p>
              <Skeleton className="h-5 w-16"/>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Gestor</p>
              <Skeleton className="h-5 w-20"/>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-600"/>
              <div className="space-y-1">
                <p className="text-sm text-gray-600">Agência</p>
                <Skeleton className="h-5 w-12"/>
              </div>
            </div>
          </div>
        </div>

        {/* Datas */ }
        <div className="bg-white/60 rounded-lg border border-green-100 p-4">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4"/>
            Período e Datas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Data Início</p>
              <Skeleton className="h-5 w-20"/>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Data Fim</p>
              <Skeleton className="h-5 w-20"/>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Criado em</p>
              <Skeleton className="h-5 w-20"/>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Atualizado em</p>
              <Skeleton className="h-5 w-20"/>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
