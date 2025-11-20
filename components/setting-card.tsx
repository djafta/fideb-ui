"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Save, X } from "lucide-react"
import { Setting } from "@/services/settings";

interface SettingCardProps {
  setting: Setting
  onUpdate?: (updatedSetting: Setting) => void
  isEditable?: boolean
}

const labelsPT: { [key: string]: string } = {
  "transfer-commission-percentage": "Percentagem da comissão de transferência",
  "stamp-duty-percentage": "Percentagem do Imposto de Selo",
  "mrf-bank-code": "Código MRF do banco",
  "scan-proposals-cron-expression": "Periodicidade de execução da varredura de propostas",
  "scan-disbursed-credits-cron-expression": "Periodicidade de execução da varredura de créditos desembolsados",
  "scan-cancellations-cron-expression": "Periodicidade de execução de cancelamento de fixações",
  "scan-invalid-discounts-cron-expression": "Periodicidade de varredura de descontos inválidos",
  "outgoing-host": "IP do servidor de envio de emails",
  "outgoing-port": "Porta do servidor de envio de emails",
  "outgoing-username": "Utilizador do servidor de envio de emails",
  "outgoing-password": "Palavra passe do utilizador de envio de emails",
  "outgoing-from": "Conta de envio de emails",
  "head-quarter-branch-code": "Código do balcão sede",
  "system-name": "Nome ou IP do sistema do core bancário",
  "transaction-code": "Código de transação",
  "outgoing-star-tls": "Ativar TLS para envio de emails",
  "outgoing-star-ssl": "Ativar SSL para envio de emails",
  "outgoing-auth": "O servidor de envio requer autenticação",
  "idle-time-out": "Tempo limite de inatividade (minutos)",
  "proposals-batch-size": "Tamanho do lote de propostas para varredura",
};

export function SettingCard({ setting, onUpdate, isEditable = true }: SettingCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedSetting, setEditedSetting] = useState<Setting>({
    name: setting.name,
    value: setting.value || "",
    category: setting.category || "",
    description: setting.description || "",
  })

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editedSetting)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedSetting(setting)
    setIsEditing(false)
  }

  const handleInputChange = (field: keyof Setting, value: string) => {
    setEditedSetting((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            { isEditing ? (
              <Input
                value={ labelsPT[editedSetting.name] || editedSetting.name }
                onChange={ (e) => handleInputChange("name", e.target.value) }
                className="font-semibold text-lg"
                placeholder="Nome da configuração"
              />
            ) : (
              <CardTitle className="text-lg">{ labelsPT[setting.name] || setting.name }</CardTitle>
            ) }

            { isEditing ? (
              <Input
                value={ editedSetting.category || "" }
                onChange={ (e) => handleInputChange("category", e.target.value) }
                className="text-sm"
                placeholder="Categoria"
              />
            ) : (
              <Badge variant="secondary" className="text-xs">
                { setting.category }
              </Badge>
            ) }
          </div>

          { isEditable && (
            <div className="flex gap-1 ml-2">
              { isEditing ? (
                <>
                  <Button size="sm" variant="ghost" onClick={ handleSave } className="h-8 w-8 p-0">
                    <Save className="h-4 w-4"/>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={ handleCancel } className="h-8 w-8 p-0">
                    <X className="h-4 w-4"/>
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="ghost" onClick={ () => setIsEditing(true) } className="h-8 w-8 p-0">
                  <Edit2 className="h-4 w-4"/>
                </Button>
              ) }
            </div>
          ) }
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Valor</label>
          { isEditing ? (
            <Input
              value={ editedSetting.value || "" }
              onChange={ (e) => handleInputChange("value", e.target.value) }
              placeholder="Valor da configuração"
            />
          ) : (
            <div className="p-2 bg-muted rounded-md text-sm font-mono">{ setting.value }</div>
          ) }
        </div>

        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Descrição</label>
          { isEditing ? (
            <Textarea
              value={ editedSetting.description || "" }
              onChange={ (e) => handleInputChange("description", e.target.value) }
              placeholder="Descrição da configuração"
              rows={ 3 }
            />
          ) : (
            <CardDescription className="text-sm leading-relaxed">{ setting.description }</CardDescription>
          ) }
        </div>
      </CardContent>
    </Card>
  )
}
