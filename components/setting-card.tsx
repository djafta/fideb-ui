"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner";

export interface SettingCardProps {
    id: string
    title: string
    value: string
    description?: string
    notes?: string
    onSave: (id: string, newValue: string, newNotes?: string) => Promise<void>
}

export function SettingCard({ id, title, value, description, notes, onSave }: SettingCardProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [currentValue, setCurrentValue] = useState(value)
    const [currentNotes, setCurrentNotes] = useState(notes || "")

    const handleSave = async () => {
        setIsLoading(true)
        try {
            await onSave(id, currentValue, currentNotes)
            toast("Configuração atualizada",
                {
                    description: `A configuração "${ title }" foi atualizada com sucesso.`,
                }
            )
        } catch (error) {
            toast("Erro ao atualizar",
                {
                    description: "Ocorreu um erro ao atualizar a configuração.",
                }
            )
            console.error("Erro ao salvar configuração:", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-5xl p-0">
            <CardHeader className={ "p-4" }>
                <CardTitle>{ title }</CardTitle>
                { description && <CardDescription>{ description }</CardDescription> }
            </CardHeader>
            <CardContent className={ "px-4" }>
                <div>
                    <Label htmlFor={ `value-${ id }` } className="text-sm font-medium hidden">
                        Valor
                    </Label>
                    <Input
                        id={ `value-${ id }` }
                        value={ currentValue }
                        onChange={ (e) => setCurrentValue(e.target.value) }
                    />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-gray-100 p-4">
                <p>
                    { notes }
                </p>
                <div className="flex space-x-2 items-end">
                    <Button variant="default" size="sm" onClick={ handleSave } disabled={ isLoading }>
                        Salvar
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
