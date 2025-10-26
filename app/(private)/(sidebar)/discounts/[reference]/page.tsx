"use client"
import { DiscountTimeline } from "@/components/discount-timeline"
import { use } from "react";
import { useDiscount, useDiscountEvents } from "@/hooks/use-discounts";
import { DiscountInfoCard } from "@/components/discount-info-card";
import { Spinner } from "@/components/ui/spinner";

export default function HomePage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = use(params);
  const discount = useDiscount(Number(reference));
  const events = useDiscountEvents(Number(reference));

  console.log(events)

  return (
    <main className="min-h-screen bg-background px-6 py-4 flex flex-col space-y-10">
      <DiscountInfoCard discountInfo={ discount.discount }/>
      {
        events.isLoading ? (<div className={"flex items-center gap-2"}><Spinner/> Carregando</div>) :
          (<DiscountTimeline discountReference={ reference } events={ events.events }/>)
      }
    </main>
  )
}
