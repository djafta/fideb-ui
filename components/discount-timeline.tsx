"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Database, FileText, RefreshCw, Send, XCircle } from "lucide-react"

interface TimelineEvent {
  type: string
  id: string
  createdAt: Date
  description: string
  payload: Record<string, any>
}

interface TimelineProps {
  discountReference: string
  events: TimelineEvent[]
}

const getEventIcon = (type: string) => {
  const iconClass = "w-4 h-4"

  switch (type.toLowerCase()) {
    case "proposal":
    case "proposta":
      return <Database className={ iconClass }/>
    case "creation":
    case "criacao":
      return <FileText className={ iconClass }/>
    case "update":
    case "atualizacao":
      return <RefreshCw className={ iconClass }/>
    case "request":
    case "requisicao":
      return <Send className={ iconClass }/>
    case "response":
    case "resposta":
      return <CheckCircle className={ iconClass }/>
    case "audit":
    case "auditoria":
      return <Clock className={ iconClass }/>
    default:
      return <Clock className={ iconClass }/>
  }
}

const getStatusFromEvent = (event: TimelineEvent): "pending" | "success" | "error" | "processing" => {
  const type = event.type.toLowerCase()

  if (type.includes("error") || type.includes("erro")) return "error"
  if (type.includes("success") || type.includes("sucesso")) return "success"
  if (type.includes("processing") || type.includes("processando")) return "processing"

  // Check payload for status indicators
  if (event.payload?.status) {
    const payloadStatus = event.payload.status.toString().toLowerCase()
    if (payloadStatus.includes("error") || payloadStatus.includes("erro")) return "error"
    if (payloadStatus.includes("success") || payloadStatus.includes("sucesso")) return "success"
    if (payloadStatus.includes("processing") || payloadStatus.includes("processando")) return "processing"
  }

  return "pending"
}

const getStatusColor = (status: "pending" | "success" | "error" | "processing") => {
  switch (status) {
    case "success":
      return "border-green-500 bg-green-500"
    case "error":
      return "border-red-500 bg-red-500"
    case "processing":
      return "border-blue-500 bg-blue-500"
    case "pending":
      return "border-gray-400 bg-gray-400"
    default:
      return "border-gray-400 bg-gray-400"
  }
}

const getEventTypeColor = (type: string) => {
  const lowerType = type.toLowerCase()
  if (lowerType.includes("audit") || lowerType.includes("auditoria")) {
    return "border-orange-400 bg-orange-50"
  }
  if (lowerType.includes("request") || lowerType.includes("response")) {
    return "border-blue-400 bg-blue-50"
  }
  return "border-green-400 bg-green-50"
}

export function DiscountTimeline({ events }: TimelineProps) {
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const sortedEvents = [...events].sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

  const handleMouseMove = (e: React.MouseEvent, eventId: string) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
    setHoveredEvent(eventId)
  }

  return (
    <div className="w-full">
      <div className="relative">
        {/* Vertical line */ }
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-green-300"/>

        {/* Events */ }
        <div className="space-y-8">
          { sortedEvents.map((event, index) => {
            const status = getStatusFromEvent(event)
            const isLast = index === sortedEvents.length - 1

            return (
              <div
                key={ event.id }
                className="relative flex items-start gap-6"
                onMouseMove={ (e) => handleMouseMove(e, event.id) }
                onMouseLeave={ () => setHoveredEvent(null) }
              >
                {/* Node */ }
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={ `
                      w-12 h-12 rounded-full border-4 border-white shadow-lg
                      flex items-center justify-center cursor-pointer
                      transition-all duration-300
                      ${ getStatusColor(status) }
                      ${ hoveredEvent === event.id ? "scale-110 shadow-xl" : "" }
                    ` }
                    onClick={ () => setSelectedEvent(event) }
                  >
                    { getEventIcon(event.type) }
                  </div>

                  {/* Connecting line to next event */ }
                  { !isLast && (
                    <div className="absolute top-12 left-1/2 w-0.5 h-8 bg-green-300 transform -translate-x-1/2"/>
                  ) }
                </div>

                {/* Event card */ }
                <div className="flex-1 min-w-0">
                  <div
                    className={ `
                      inline-flex items-center gap-3 px-4 py-3 rounded-lg border-2
                      transition-all duration-300 cursor-pointer
                      ${ getEventTypeColor(event.type) }
                      ${ hoveredEvent === event.id ? "shadow-md scale-[1.02]" : "shadow-sm" }
                    ` }
                    onClick={ () => setSelectedEvent(event) }
                  >
                    <div className="flex items-center gap-2">
                      { getEventIcon(event.type) }
                      <span className="font-semibold text-slate-800">{ event.type }</span>
                    </div>

                    <div className="text-sm text-slate-600">
                      { event.createdAt.toLocaleString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }) }
                    </div>

                    <Badge variant="outline" className="text-xs">
                      { status }
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-600 mt-2 ml-1">{ event.description }</p>
                </div>
              </div>
            )
          }) }
        </div>
      </div>

      { hoveredEvent && typeof window !== "undefined" && (
        <div
          className="fixed z-40 pointer-events-none"
          style={ {
            left: mousePosition.x > window.innerWidth - 350 ? mousePosition.x - 350 : mousePosition.x + 20,
            top: mousePosition.y > window.innerHeight - 200 ? mousePosition.y - 200 : mousePosition.y - 10,
          } }
        >
          <Card className="w-80 shadow-xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-4">
              { (() => {
                const event = sortedEvents.find((e) => e.id === hoveredEvent)
                if (!event) return null

                return (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      { getEventIcon(event.type) }
                      <h4 className="font-semibold text-slate-800">{ event.type }</h4>
                    </div>

                    <div>
                      <h5 className="text-xs font-medium text-slate-600 uppercase mb-1">Payload</h5>
                      <div className="bg-slate-900 rounded p-2 max-h-32 overflow-y-auto">
                        <pre
                          className="text-xs text-green-400 font-mono">{ JSON.stringify(event.payload, null, 2) }</pre>
                      </div>
                    </div>
                  </div>
                )
              })() }
            </CardContent>
          </Card>
        </div>
      ) }

      {/* Selected event popup */ }
      { selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl max-h-[85vh] overflow-auto shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-100">{ getEventIcon(selectedEvent.type) }</div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800">{ selectedEvent.type }</h3>
                    <p className="text-slate-500 font-mono">{ selectedEvent.createdAt.toLocaleString("pt-BR") }</p>
                  </div>
                </div>
                <button
                  onClick={ () => setSelectedEvent(null) }
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6 text-slate-400"/>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4"/>
                    Descrição
                  </h4>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-lg">
                    { selectedEvent.description }
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <Database className="w-4 h-4"/>
                    Dados do Evento
                  </h4>
                  <pre
                    className="bg-slate-900 text-green-400 p-4 rounded-lg text-sm font-mono overflow-auto max-h-64 shadow-inner">
                    { JSON.stringify(selectedEvent.payload, null, 2) }
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) }
    </div>
  )
}
