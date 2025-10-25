"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { DiffModal } from "@/components/diff-modal";
import { Button } from "@/components/ui/button";

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

const operations: Record<string, string> = {
  C: "Fixação",
  D: "Cancelamento",
  U: "Atualização"
}

export function DiscountTimeline({ discountReference, events }: TimelineProps) {
  const [diff, setDiff] = useState({
    before: null,
    after: null,
  });

  return (
    <div className="flex w-full flex-col gap-6">
      <DiffModal open={ (!!diff.after || !!diff.before) } onClose={ () => setDiff({
        after: null,
        before: null,
      }) } before={ diff.before } after={ diff.after }/>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="requests">Envios</TabsTrigger>
          <TabsTrigger value="responses">Respostas</TabsTrigger>
          <TabsTrigger value="audits">Auditorias</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Todos eventos</CardTitle>
              <CardDescription>
                Veja todos os eventos ocorridos para o disconto { discountReference }
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Data e hora</TableHead>
                    <TableHead>Tipo de evento</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { events?.map((event, index) => (
                    <TableRow key={ index }>
                      <TableCell>{ event.createdAt.toLocaleString() }</TableCell>
                      <TableCell>{ event.type }</TableCell>
                      <TableCell>{ event.description }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Envios</CardTitle>
              <CardDescription>
                Veja todos os pedidos enviados ao CEDSIF para o disconto { discountReference }
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Data e hora</TableHead>
                    <TableHead>Operação</TableHead>
                    <TableHead>Business Code</TableHead>
                    <TableHead>NUIT</TableHead>
                    <TableHead>Orgânico</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead>Data Fim</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { events?.filter(event => event.type === "Envio").map((event, index) => (
                    <TableRow key={ event.id + index }>
                      <TableCell>{ event.createdAt.toLocaleString() }</TableCell>
                      <TableCell>{ operations[event.payload.operation] }</TableCell>
                      <TableCell>{ event.payload.businessCode }</TableCell>
                      <TableCell>{ event.payload.discount.nuit }</TableCell>
                      <TableCell>{ event.payload.discount.organization }</TableCell>
                      <TableCell>{ event.payload.discount.amount }</TableCell>
                      <TableCell>{ event.payload.discount.startDate }</TableCell>
                      <TableCell>{ event.payload.discount.endDate }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="responses">
          <Card>
            <CardHeader>
              <CardTitle>Respostas</CardTitle>
              <CardDescription>
                Veja todas as respostas recebidas do CEDSIF para o disconto { discountReference }
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Data e hora</TableHead>
                    <TableHead>Operação</TableHead>
                    <TableHead>Business Code</TableHead>
                    <TableHead>NUIT</TableHead>
                    <TableHead>Orgânico</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Data Início</TableHead>
                    <TableHead>Data Fim</TableHead>
                    <TableHead>Motivo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { events?.filter(event => event.type === "Resposta").map((event, index) => (
                    <TableRow key={ event.id + index }>
                      <TableCell>{ event.createdAt.toLocaleString() }</TableCell>
                      <TableCell>{ operations[event.payload.request.operation] }</TableCell>
                      <TableCell>{ event.payload.request.businessCode }</TableCell>
                      <TableCell>{ event.payload.request.discount.nuit }</TableCell>
                      <TableCell>{ event.payload.request.discount.organization }</TableCell>
                      <TableCell>{ event.payload.request.discount.amount }</TableCell>
                      <TableCell>{ event.payload.request.discount.startDate }</TableCell>
                      <TableCell>{ event.payload.request.discount.endDate }</TableCell>
                      <TableCell>{ event.payload.payload.reason }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audits">
          <Card>
            <CardHeader>
              <CardTitle>Auditorias</CardTitle>
              <CardDescription>
                Veja todos os eventos de alteração para o disconto { discountReference }
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-48">Data e hora</TableHead>
                    <TableHead className={ "w-28" }>Utilizador</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { events?.filter(event => event.type === "Auditoria").map((event, index) => (
                    <TableRow key={ event.id + index }>
                      <TableCell>{ event.createdAt.toLocaleString() }</TableCell>
                      <TableCell>{ event.payload.username }</TableCell>
                      <TableCell>{ event.description }</TableCell>
                      <TableCell><Button
                        variant={ "link" }
                        onClick={ () => {
                          setDiff({
                            before: event.payload.before,
                            after: event.payload.after
                          })
                        } }
                      >Ver detalhes</Button></TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
