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
                value={ editedSetting.name }
                onChange={ (e) => handleInputChange("name", e.target.value) }
                className="font-semibold text-lg"
                placeholder="Nome da configuração"
              />
            ) : (
              <CardTitle className="text-lg">{ setting.name }</CardTitle>
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
