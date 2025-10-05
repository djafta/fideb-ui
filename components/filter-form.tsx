"use client"

import { JSX, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Filter, Search, X } from "lucide-react"

// Definição dos campos disponíveis baseados no JSON fornecido
const AVAILABLE_FIELDS = [
  { key: "reference", label: "Referência", type: "number" },
  { key: "nuit", label: "NUIT", type: "number" },
  { key: "organization", label: "Organização", type: "text" },
  { key: "amount", label: "Valor", type: "number" },
  { key: "startDate", label: "Data Início", type: "date" },
  { key: "endDate", label: "Data Fim", type: "date" },
  { key: "createdAt", label: "Criado em", type: "date" },
  { key: "updatedAt", label: "Atualizado em", type: "date" },
  {
    key: "situation", label: "Situação", type: "select", options: [
      {
        "name": "Rejeitado",
        "value": "PENDING_ACTION"
      },
      {
        "name": "Pendente de fixação",
        "value": "PENDING_FIXING"
      },
      {
        "name": "Pendente de cancelamento",
        "value": "PENDING_CANCELLATION"
      },
      {
        "name": "Pendente de actualização",
        "value": "PENDING_UPDATE"
      },
      {
        "name": "Fixado",
        "value": "FIXED"
      },
      {
        "name": "Cancelado",
        "value": "CANCELLED"
      },
      {
        "name": "Para fixação",
        "value": "NOT_FIXED"
      },
      {
        "name": "Para cancelamento",
        "value": "NOT_CANCELED"
      },
      {
        "name": "Para actualização",
        "value": "NOT_UPDATED"
      },
      {
        "name": "Pendente",
        "value": "PENDING"
      },
      {
        "name": "Inválido",
        "value": "INVALID"
      }
    ]
  },
  { key: "entity", label: "Entidade", type: "text" },
  { key: "client", label: "Cliente", type: "number" },
  { key: "manager", label: "Gestor", type: "text" },
  { key: "branch", label: "Balcão", type: "text" },
]

interface FilterItem {
  id: string
  field: string
  value: string
  label: string
}

type FilterFormProps = {
  onSearch: (value: string) => void
}

export function FilterForm({ onSearch }: FilterFormProps): JSX.Element {
  const [searchValue, setSearchValue] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterItem[]>([])
  const [selectedField, setSelectedField] = useState("")
  const [fieldValue, setFieldValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element

      // Don't close if clicking on Select elements or their portals
      if (
        target.closest('[role="combobox"]') ||
        target.closest("[data-radix-select-content]") ||
        target.closest("[data-radix-popper-content-wrapper]")
      ) {
        return
      }

      if (containerRef.current && !containerRef.current.contains(target as Node)) {
        setShowFilters(false)
      }
    }

    if (showFilters) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFilters])

  // Gerar query string dos filtros
  const generateQueryString = () => {
    const params = new URLSearchParams()

    // Adicionar busca geral se existir
    if (searchValue.trim()) {
      params.append("search", searchValue.trim())
    }

    // Adicionar filtros específicos
    filters.forEach((filter) => {
      params.append(filter.field, filter.value)
    })

    return params.toString()
  }

  // Adicionar novo filtro
  const addFilter = () => {
    if (!selectedField || !fieldValue.trim()) return

    const field = AVAILABLE_FIELDS.find((f) => f.key === selectedField)
    if (!field) return

    const newFilter: FilterItem = {
      id: Date.now().toString(),
      field: selectedField,
      value: fieldValue.trim(),
      label: field.label,
    }

    setFilters((prev) => [...prev, newFilter])
    setSelectedField("")
    setFieldValue("")
  }

  // Remover filtro
  const removeFilter = (filterId: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== filterId))
  }

  // Limpar todos os filtros
  const clearAllFilters = () => {
    setFilters([])
    setSearchValue("")
    onSearch("")
  }

  // Executar busca (simular request)
  const executeSearch = () => {
    const queryString = generateQueryString()
    console.log("Query String gerada:", queryString)

    onSearch(queryString)
  }

  const selectedFieldData = AVAILABLE_FIELDS.find((f) => f.key === selectedField)

  return (
    <div ref={ containerRef } className="relative w-full max-w-2xl">
      {/* Input de busca principal */ }
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4"/>
        <Input
          ref={ inputRef }
          type="text"
          placeholder="Digite para buscar ou clique para filtrar..."
          value={ searchValue }
          onChange={ (e) => setSearchValue(e.target.value) }
          onFocus={ () => setShowFilters(true) }
          className="pl-10 pr-12"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={ () => setShowFilters(!showFilters) }
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="h-4 w-4"/>
        </Button>
      </div>

      {/* Filtros aplicados */ }
      { filters.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          { filters.map((filter) => (
            <Badge key={ filter.id } variant="secondary" className="flex items-center gap-1">
              <span className="text-xs">
                { filter.label }: { filter.value }
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={ () => removeFilter(filter.id) }
                className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                <X className="h-3 w-3"/>
              </Button>
            </Badge>
          )) }
          <Button variant="outline" size="sm" onClick={ clearAllFilters } className="h-6 text-xs bg-transparent">
            Limpar todos
          </Button>
        </div>
      ) }

      {/* Dropdown de filtros */ }
      { showFilters && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Filtros Avançados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div onClick={ (e) => e.stopPropagation() }>
              {/* Seleção de campo */ }
              <div className="space-y-2">
                <Label htmlFor="field-select" className="text-xs">
                  Campo
                </Label>
                <Select value={ selectedField } onValueChange={ setSelectedField }>
                  <SelectTrigger id="field-select">
                    <SelectValue placeholder="Selecione um campo"/>
                  </SelectTrigger>
                  <SelectContent>
                    { AVAILABLE_FIELDS.map((field) => (
                      <SelectItem key={ field.key } value={ field.key }>
                        { field.label }
                      </SelectItem>
                    )) }
                  </SelectContent>
                </Select>
              </div>

              {/* Input de valor baseado no tipo do campo */ }
              { selectedField && (
                <div className="space-y-2 mt-4">
                  <Label htmlFor="field-value" className="text-xs">
                    Valor
                  </Label>
                  { selectedFieldData?.type === "select" ? (
                    <Select value={ fieldValue } onValueChange={ setFieldValue }>
                      <SelectTrigger id="field-value">
                        <SelectValue placeholder="Selecione um valor"/>
                      </SelectTrigger>
                      <SelectContent>
                        { selectedFieldData.options?.map((option) => (
                          <SelectItem key={ option.name } value={ option.value }>
                            { option.name }
                          </SelectItem>
                        )) }
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="field-value"
                      type={
                        selectedFieldData?.type === "number"
                          ? "number"
                          : selectedFieldData?.type === "date"
                            ? "date"
                            : "text"
                      }
                      placeholder={ `Digite o ${ selectedFieldData?.label.toLowerCase() }` }
                      value={ fieldValue }
                      onChange={ (e) => setFieldValue(e.target.value) }
                      onKeyDown={ (e) => e.key === "Enter" && addFilter() }
                    />
                  ) }
                </div>
              ) }

              {/* Botões de ação */ }
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={ addFilter }
                  disabled={ !selectedField || !fieldValue.trim() }
                  size="sm"
                  className="flex-1"
                >
                  Adicionar Filtro
                </Button>
                <Button onClick={ executeSearch } variant="default" size="sm" className="flex-1">
                  Buscar
                </Button>
              </div>

              {/* Preview da query string */ }
              { (filters.length > 0 || searchValue.trim()) && (
                <div className="pt-4 border-t mt-4">
                  <Label className="text-xs text-muted-foreground">Query String:</Label>
                  <code className="block text-xs bg-muted p-2 rounded mt-1 break-all">
                    { generateQueryString() || "Nenhum parâmetro" }
                  </code>
                </div>
              ) }
            </div>
          </CardContent>
        </Card>
      ) }
    </div>
  )
}
