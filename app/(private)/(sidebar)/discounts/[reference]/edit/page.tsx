"use client";
import { use, useEffect, useState } from "react";
import { useDiscounts } from "@/hooks/use-discounts";
import { DiscountInfoCard } from "@/components/discount-info-card";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { updateDiscount } from "@/services/discounts";
import { Spinner } from "@/components/ui/spinner";
import { Discount } from "@/lib/types";
import { MonthYearSelect } from "@/components/MonthYearSelect";
import Link from "next/link";
import { toast } from "sonner";

export default function Page({ params }: { params: Promise<{ reference: string }> }) {
  const { reference } = use(params);
  const { discounts, refetch } = useDiscounts(0, 1, undefined, `reference=${ reference }`);
  const [payload, setPayload] = useState<Discount | null>(null)
  const mutation = useMutation({
    mutationFn: (variables: Discount) => updateDiscount(Number(reference), variables),
    onSuccess: () => {
      refetch()
      toast.success("Desconto actualizado com sucesso")
    }
  })

  const discount = discounts[0];

  useEffect(() => {
    if (discount)
      setPayload(() => ({
        ...discount
      }))
  }, [discount]);

  return (
    <main className="min-h-screen bg-background px-6 py-4 flex flex-col space-y-10">
      <DiscountInfoCard discountInfo={ discount }/>
      {
        payload ? (
            <Card className={ "border border-green-50" }>
              <CardContent>
                <CardTitle className={ "mb-5" }>Dados a actualizar</CardTitle>
                <div className={ "flex flex-col gap-3" }>
                  <div className={ "flex gap-6" }>
                    <div className={ "flex flex-col gap-2" }>
                      <Label htmlFor={ "amountInput" }>Valor</Label>
                      <Input type={ "number" } onChange={ (event) => {
                        setPayload((prevState) => {
                          if (prevState) {
                            return {
                              ...prevState,
                              amount: Number(event.target.value)
                            }
                          } else {
                            return null;
                          }
                        })
                      } } id={ "amountInput" } value={ payload.amount }/>
                    </div>
                    <div className={ "flex flex-col gap-2" }>
                      <Label className={ "flex justify-center" } htmlFor={ "endDateInput" }>Data Fim</Label>
                      <MonthYearSelect
                        onValueChange={ (value) => {
                          setPayload(prevState => {
                            if (prevState) {
                              return {
                                ...prevState,
                                endDate: value.toISOString().split("T")[0]
                              }
                            }

                            throw new Error("Invalid state");
                          })
                        } }
                        value={ new Date(payload.endDate) }
                      />
                    </div>
                  </div>
                  {
                    (payload.situation == "PENDING_ACTION" || payload.situation == "FIXED") && (
                      <div className={ "flex gap-10" }>
                        <Button onClick={ () => {
                          mutation.mutate(payload)
                        } }>Salvar { mutation.isPending && <Spinner/> }</Button>
                        <Button variant={ "destructive" } asChild><Link
                          href={ `/discounts/${ reference }` }>Cancelar</Link></Button>
                      </div>
                    )
                  }
                </div>
              </CardContent>
            </Card>
          ) :
          (
            <div className={ "flex justify-center items-center h-full" }>
              <Spinner/>
            </div>
          )
      }
    </main>
  )
}
