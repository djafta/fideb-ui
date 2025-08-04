'use client'
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { useStats } from "@/hooks/use-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export function SectionCards() {
    const { discountsStats } = useStats();

    if (discountsStats.isError) {
        toast("Erro ao carregar estatísticas",
            {
                description: "Não foi possível carregar as estatísticas de descontos. Tente novamente mais tarde.",
                variant: "destructive",
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
                                { discountsStats.data?.success || 0 }
                            </CardTitle>
                            <div className="absolute right-4 top-4">
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingUpIcon className="size-3"/>
                                    +12.5%
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Tendências do mês <TrendingUpIcon className="size-4"/>
                            </div>
                            <div className="text-muted-foreground">

                            </div>
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader className="relative">
                            <CardDescription>Requerendo tratamento</CardDescription>
                            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                { discountsStats.data?.pendingAction || 0 }
                            </CardTitle>
                            <div className="absolute right-4 top-4">
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingUpIcon className="size-3"/>
                                    +12.5%
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Tendências do mês <TrendingUpIcon className="size-4"/>
                            </div>
                            <div className="text-muted-foreground"></div>
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader className="relative">
                            <CardDescription>Sem resposta</CardDescription>
                            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                { discountsStats.data?.unanswered || 0 }
                            </CardTitle>
                            <div className="absolute right-4 top-4">
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingUpIcon className="size-3"/>
                                    +4.5%
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Aumento de 4.5% <TrendingUpIcon className="size-4"/>
                            </div>
                            <div className="text-muted-foreground"></div>
                        </CardFooter>
                    </Card>
                    <Card className="@container/card">
                        <CardHeader className="relative">
                            <CardDescription>Pendentes</CardDescription>
                            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
                                { discountsStats.data?.pending || 0 }
                            </CardTitle>
                            <div className="absolute right-4 top-4">
                                <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                                    <TrendingDownIcon className="size-3"/>
                                    -20%
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                                Caída de 20% neste período <TrendingDownIcon className="size-4"/>
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