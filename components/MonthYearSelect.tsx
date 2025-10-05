"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MonthYearSelectProps {
  className?: string
  value: Date,
  onValueChange: (value: Date) => void,
}

export function MonthYearSelect({ className, value, onValueChange }: MonthYearSelectProps) {

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"].map((month, index) => ({
    value: index,
    label: month,
  }))

  const referenceDate = new Date();
  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth();

  if (currentMonth === 10) {
    referenceDate.setFullYear(currentYear + 1);
    referenceDate.setMonth(0);
  }

  const years = Array.from({ length: 300 }, (_, i) => (referenceDate.getFullYear()) + i)

  return (
    <div className={ `flex gap-2 ${ className || "" }` }>
      <Select value={ value.getMonth().toString() }
              onValueChange={ (v) => onValueChange(new Date(`${ value.getFullYear() }-${ Number(v) + 1 }-${ value.getDate() }`)) }>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select month"/>
        </SelectTrigger>
        <SelectContent>
          { months.map((month) => (
            <SelectItem key={ month.value.toString() } value={ month.value.toString() }>
              { month.label }
            </SelectItem>
          )) }
        </SelectContent>
      </Select>

      <Select
        value={ referenceDate.getFullYear() > value.getFullYear() ? referenceDate.getFullYear().toString() : value.getFullYear().toString() }
        onValueChange={ (v) => onValueChange(new Date(`${ v }-${ value.getMonth() }-${ value.getDate() }`)) }>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Year"/>
        </SelectTrigger>
        <SelectContent>
          { years.map((year) => (
            <SelectItem key={ year } value={ year.toString() }>
              { year }
            </SelectItem>
          )) }
        </SelectContent>
      </Select>
    </div>
  )
}
