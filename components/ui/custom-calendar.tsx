"use client"

import type * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function CustomCalendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  function CustomCaption({
    displayMonth,
    onMonthChange,
    ...captionProps
  }: React.ComponentProps<typeof DayPicker.Caption>) {
    const handlePreviousClick = () => {
      const previousMonth = new Date(displayMonth)
      previousMonth.setMonth(previousMonth.getMonth() - 1)
      onMonthChange(previousMonth)
    }

    const handleNextClick = () => {
      const nextMonth = new Date(displayMonth)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      onMonthChange(nextMonth)
    }

    const handleYearSelect = (year: string) => {
      const newDate = new Date(displayMonth)
      newDate.setFullYear(Number.parseInt(year))
      onMonthChange(newDate)
    }

    const handleMonthSelect = (month: string) => {
      const newDate = new Date(displayMonth)
      newDate.setMonth(Number.parseInt(month))
      onMonthChange(newDate)
    }

    const currentYear = displayMonth.getFullYear()
    const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    return (
      <div className="flex items-center justify-between px-2 py-2 bg-amber-50 rounded-t-md border-b border-amber-200">
        <button
          onClick={handlePreviousClick}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-8 w-8 bg-white border-amber-300 text-amber-700 hover:bg-amber-100 hover:text-amber-900 p-0 shadow-sm transition-all duration-150",
          )}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          <Select value={displayMonth.getMonth().toString()} onValueChange={handleMonthSelect}>
            <SelectTrigger className="h-8 w-[110px] text-xs font-semibold bg-white border-amber-300 text-amber-900">
              <SelectValue>{format(displayMonth, "MMMM")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={month} value={index.toString()} className="text-xs">
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={displayMonth.getFullYear().toString()} onValueChange={handleYearSelect}>
            <SelectTrigger className="h-8 w-[70px] text-xs font-semibold bg-white border-amber-300 text-amber-900">
              <SelectValue>{displayMonth.getFullYear()}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()} className="text-xs">
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={handleNextClick}
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "h-8 w-8 bg-white border-amber-300 text-amber-700 hover:bg-amber-100 hover:text-amber-900 p-0 shadow-sm transition-all duration-150",
          )}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 select-none bg-white rounded-md border border-amber-200 shadow-lg", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 w-full sm:w-auto",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        nav: "hidden",
        table: "w-full border-collapse space-y-1",
        head_row: "flex border-b border-amber-200 mb-1 bg-amber-50 rounded-t-md",
        head_cell:
          "text-amber-700 font-semibold w-9 h-9 flex items-center justify-center text-xs tracking-wide uppercase",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-amber-100 text-amber-900 rounded-full transition-colors border border-transparent focus:border-amber-400",
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-amber-800 text-white hover:bg-amber-800 hover:text-white focus:bg-amber-800 focus:text-white rounded-full border border-amber-700",
        day_today: "bg-amber-100 text-amber-900 rounded-full border border-amber-300",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
      }}
      {...props}
    />
  )
}
CustomCalendar.displayName = "CustomCalendar"

export { CustomCalendar }
