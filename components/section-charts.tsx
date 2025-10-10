'use client'
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { useStats } from "@/hooks/use-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { formatInt } from "@/lib/utils";
import { useSeries } from "@/hooks/use-series";
import { DiscountSeries } from "@/services/series";

function getMonthTrending(currentMonthSeries?: Omit<DiscountSeries, "createdAt">, lastMonthSeries?: Omit<DiscountSeries, "createdAt">) {
  let pending = 0;
  let pendingAction = 0;
  let success = 0;
  let unanswered = 0;

  if (currentMonthSeries && lastMonthSeries) {
    pending = Math.round((currentMonthSeries.pending - lastMonthSeries.pending) / lastMonthSeries.pending * 100) || 0;
    pendingAction = Math.round((currentMonthSeries.pendingAction - lastMonthSeries.pendingAction) / lastMonthSeries.pendingAction * 100) || 0;
    success = Math.round((currentMonthSeries.success - lastMonthSeries.success) / lastMonthSeries.success * 100) || 0;
    unanswered = Math.round((currentMonthSeries.unanswered - lastMonthSeries.unanswered) / lastMonthSeries.unanswered * 100) || 0;
  }

  return {
    pending,
    pendingAction,
    success,
    unanswered,
  }
}

export function SectionCards() {
  const { discountsStats } = useStats();
  const { data } = useSeries();

  const currentMonthSeries = data?.filter(item => new Date(item.createdAt).getMonth() === new Date().getMonth())
    .reduce((acc, item) => {
      return {
        pending: acc.pending + item.pending,
        pendingAction: acc.pendingAction + item.pendingAction,
        success: acc.success + item.success,
        unanswered: acc.unanswered + item.unanswered,
      }
    }, {
      pending: 0,
      pendingAction: 0,
      success: 0,
      unanswered: 0,
    })

  const lastMonthSeries = data?.filter(item => new Date(item.createdAt).getMonth() === new Date(new Date().setMonth(new Date().getMonth() - 1)).getMonth())
    .reduce((acc, item) => {
      return {
        pending: acc.pending + item.pending,
        pendingAction: acc.pendingAction + item.pendingAction,
        success: acc.success + item.success,
        unanswered: acc.unanswered + item.unanswered,
      }
    }, {
      pending: 0,
      pendingAction: 0,
      success: 0,
      unanswered: 0,
    })

  const monthTrending = getMonthTrending(currentMonthSeries, lastMonthSeries);

  if (discountsStats.isError) {
    toast("Erro ao carregar estatísticas",
      {
        description: "Não foi possível carregar as estatísticas de descontos. Tente novamente mais tarde.",
        duration: 5000,
      })
  }

  return (
    <div
      className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      { discountsStats.isLoading ? (
        <>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
          <CardSkeleton/>
        </>
      ) : (
        <>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Com sucesso</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                { formatInt(discountsStats.data?.success || 0) }
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  {
                    monthTrending.success < 0 ?
                      <TrendingDownIcon className={ "size-3" }/> :
                      <TrendingUpIcon className="size-3"/>
                  }
                  { monthTrending.success }%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Tendências do mês {
                monthTrending.success < 0 ?
                  <TrendingDownIcon className={ "size-4" }/> :
                  <TrendingUpIcon className="size-4"/>
              }
              </div>
              <div className="text-muted-foreground">

              </div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Requerendo tratamento</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                { formatInt(discountsStats.data?.pendingAction || 0) }
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  {
                    monthTrending.pendingAction < 0 ?
                      <TrendingDownIcon className={ "size-3" }/> :
                      <TrendingUpIcon className="size-3"/>
                  }
                  { monthTrending.pendingAction }%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Tendências do mês {
                monthTrending.pendingAction < 0 ?
                  <TrendingDownIcon className={ "size-4" }/> :
                  <TrendingUpIcon className="size-4"/>
              }
              </div>
              <div className="text-muted-foreground"></div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Sem resposta</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                { formatInt(discountsStats.data?.unanswered ?? 0) }
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  {
                    monthTrending.unanswered <= 0 ?
                      <TrendingDownIcon className={ "size-3" }/> :
                      <TrendingUpIcon className="size-3"/>
                  }
                  { monthTrending.unanswered }%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Tendências do mês {
                monthTrending.unanswered <= 0 ?
                  <TrendingDownIcon className={ "size-4" }/> :
                  <TrendingUpIcon className="size-4"/>
              }
              </div>
              <div className="text-muted-foreground"></div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader className="relative">
              <CardDescription>Pendentes</CardDescription>
              <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                { formatInt(discountsStats.data?.pending || 0) }
              </CardTitle>
              <div className="absolute right-4 top-4">
                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                  {
                    monthTrending.pending < 0 ?
                      <TrendingDownIcon className={ "size-3" }/> :
                      <TrendingUpIcon className="size-3"/>
                  }
                  { monthTrending.pending }%
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Tendências do mês {
                monthTrending.pending < 0 ?
                  <TrendingDownIcon className={ "size-4" }/> :
                  <TrendingUpIcon className="size-4"/>
              }
              </div>
              <div className="text-muted-foreground">

              </div>
            </CardFooter>
          </Card>
        </>
      ) }
    </div>
  )
}

export default function CardSkeleton() {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <Skeleton className="h-4 w-24 mb-2"/>
        <Skeleton className="@[250px]/card:h-9 h-8 w-32"/>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <Skeleton className="h-3 w-10"/>
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium items-center">
          <Skeleton className="h-4 w-28"/>
        </div>
        <div className="text-muted-foreground">
          <Skeleton className="h-3 w-40"/>
        </div>
      </CardFooter>
    </Card>
  )
}