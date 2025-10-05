"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem, } from "@/components/ui/toggle-group"
import { useSeries } from "@/hooks/use-series";

const chartConfig = {
  success: {
    label: "Sucesso",
    color: "hsl(var(--chart-1))",
  },
  pendingAction: {
    label: "Rejeitados",
    color: "hsl(var(--chart-2))",
  },
  pending: {
    label: "Pendentes",
    color: "hsl(var(--chart-3))",
  },
  unanswered: {
    label: "Sem resposta",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")
  const { data } = useSeries();

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])


  const formatedData = (data || []).map((item) => ({
    date: new Date(item.createdAt),
    pendingAction: item.pendingAction,
    success: item.success,
    pending: item.pending,
    unanswered: item.unanswered
  }))

  const filteredData = formatedData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    const referenceDate = new Date(now.setMonth(now.getMonth() - 20))

    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(referenceDate)

    startDate.setDate(startDate.getDate() - daysToSubtract)

    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total de descontos</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total dos últimos 3 meses
          </span>
          <span className="@[540px]/card:hidden">Últimos 3 meses</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={ timeRange }
            onValueChange={ setTimeRange }
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Últimos 3 meses
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Últimos 30 dias
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Últimos 7 dias
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={ timeRange } onValueChange={ setTimeRange }>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months"/>
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 dias
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={ chartConfig }
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={ filteredData }>
            <defs>
              <linearGradient id="fillSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={ 1.0 }
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-1)"
                  stopOpacity={ 0.1 }
                />
              </linearGradient>
              <linearGradient id="fillPendingAction" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-2)"
                  stopOpacity={ 0.8 }
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-2)"
                  stopOpacity={ 0.1 }
                />
              </linearGradient>
              <linearGradient id="fillPending" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-3)"
                  stopOpacity={ 0.8 }
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-3)"
                  stopOpacity={ 0.1 }
                />
              </linearGradient>
              <linearGradient id="fillUnanswered" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-4)"
                  stopOpacity={ 0.8 }
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-4)"
                  stopOpacity={ 0.1 }
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={ false }/>
            <XAxis
              dataKey="date"
              tickLine={ false }
              axisLine={ false }
              tickMargin={ 8 }
              minTickGap={ 32 }
              tickFormatter={ (value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-PT", {
                  month: "short",
                  day: "numeric",
                })
              } }
            />
            <ChartTooltip cursor={ false } content={ <ChartTooltipContent labelFormatter={ (value, payload) => {
              return new Date(payload[0].payload?.date).toLocaleDateString("pt-PT", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            } } indicator="dot"/> }/>
            <Area
              dataKey="success"
              type="natural"
              fill="url(#fillSuccess)"
              stroke="var(--color-chart-1)"
              stackId="a"
            />
            <Area
              dataKey="pendingAction"
              type="natural"
              fill="url(#fillPendingAction)"
              stroke="var(--color-chart-2)"
              stackId="b"
            />
            <Area
              dataKey="pending"
              type="natural"
              fill="url(#fillPending)"
              stroke="var(--color-chart-3)"
              stackId="c"
            />
            <Area
              dataKey="unanswered"
              type="natural"
              fill="url(#fillUnanswered)"
              stroke="var(--color-chart-4)"
              stackId="d"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
