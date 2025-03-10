import React, {forwardRef} from "react"
import {Calendar, CalendarProps} from "primereact/calendar"

type Props = CalendarProps & {
  value?: string // Accepts a date string from the backend
}

const parseDateString = (dateString: string): Date | null => {
  if (!dateString) return null

  const [datePart, timePart] = dateString.split(", ")
  if (!datePart || !timePart) return null

  const [day, month, year] = datePart.split(".").map(Number)
  const [hours, minutes, seconds] = timePart.split(":").map(Number)

  return new Date(year, month - 1, day, hours, minutes, seconds)
}

const DatePicker = forwardRef<HTMLInputElement, Props>(({value, ...props}, ref) => {
  const parsedDate = value ? parseDateString(value) : null

  return (
    <Calendar
      locale="ru"
      showTime
      hourFormat="24"
      showButtonBar
      showIcon
      value={parsedDate}
      inputRef={ref}
      {...props}
    />
  )
})

export default DatePicker
