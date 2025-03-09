import React, {forwardRef} from "react"
import {Calendar, CalendarProps} from "primereact/calendar"

type Props = CalendarProps

const DatePicker = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <Calendar locale="ru" showTime hourFormat="24" showButtonBar showIcon inputRef={ref} {...props} />
})

export default DatePicker
