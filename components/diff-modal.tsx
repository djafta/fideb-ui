import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface DiffModalProps {
  open: boolean
  onClose: () => void
  before: Record<string, any> | null
  after: Record<string, any> | null
  title?: string
}

function getDiff(before: Record<string, any> | null, after: Record<string, any> | null) {
  const allKeys = new Set([
    ...Object.keys(before || {}),
    ...Object.keys(after || {}),
  ])

  return Array.from(allKeys).map((key) => {
    const oldValue = before?.[key]
    const newValue = after?.[key]

    if (oldValue === undefined && newValue !== undefined)
      return { key, oldValue, newValue, status: "added" }
    if (oldValue !== undefined && newValue === undefined)
      return { key, oldValue, newValue, status: "removed" }
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue))
      return { key, oldValue, newValue, status: "changed" }
    return { key, oldValue, newValue, status: "unchanged" }
  })
}

const LABELS: Record<string, string> = {
  branch: "Balcão",
  manager: "Gestor",
  client: "Cliente",
  entity: "Entidade",
  nuit: "NUIT",
  organization: "Orgânico",
  reference: "Referência",
  amount: "Valor",
  startDate: "Data Início",
  endDate: "Data Fim",
  situation: "Situação",
  createdAt: "Criado em",
  updatedAt: "Atualizado em",
  fixedAt: "Fixado em",
}


export function DiffModal({ open, onClose, before, after, title = "Detalhes do evento" }: DiffModalProps) {
  const diff = getDiff(before, after)

  return (
    <Dialog modal={ true } open={ open } onOpenChange={ onClose }>
      <DialogContent className="p-0 !w-full !max-w-3xl">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-semibold">{ title }</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] px-6 pb-6">
          <table className="w-full border-collapse text-sm">
            <thead>
            <tr className="border-b text-left font-semibold">
              <th className="p-2 w-48">Campo</th>
              <th className="p-2 w-1/2">Antes</th>
              <th className="p-2 w-1/2">Depois</th>
            </tr>
            </thead>
            <tbody>
            { diff.map(({ key, oldValue, newValue, status }) => (
              <tr
                key={ key }
                className={ cn(
                  "border-b transition-colors",
                  status === "added" && "text-green-600",
                  status === "removed" && "text-red-600",
                  status === "changed" && "text-yellow-500"
                ) }
              >
                <td className="p-2 font-medium w-64">{ LABELS[key] }</td>
                <td className="p-2 text-gray-600">{ formatValue(oldValue) }</td>
                <td className="p-2 text-gray-900">{ formatValue(newValue) }</td>
              </tr>
            )) }
            </tbody>
          </table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

const situations: { [key: string]: string } = {
  "PENDING_ACTION": "Rejeitado",
  "PENDING_FIXING": "Por fixar",
  "PENDING_CANCELLATION": "Por cancelar",
  "PENDING_UPDATE": "Por actualizar",
  "FIXED": "Fixado",
  "CANCELLED": "Cancelado",
  "NOT_FIXED": "Não fixado",
  "NOT_CANCELED": "Não cancelado",
  "NOT_UPDATED": "Não atualizado",
  "PENDING": "Pendente",
  "INVALID": "Inválido",
}

function formatValue(value: any) {
  if (value === undefined || value === null) return "—"
  if (typeof value === "object") return JSON.stringify(value, null, 2)
  return situations[value] || value.toString()
}
