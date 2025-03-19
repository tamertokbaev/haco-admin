import React, {forwardRef} from "react"
import {Controller, Control} from "react-hook-form"
import {Dropdown, DropdownProps} from "primereact/dropdown"

interface SelectProps extends DropdownProps {
  name: string
  control: Control<any>
}

const Select = forwardRef<any, SelectProps>(({name, control, ...rest}, ref) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <Dropdown {...field} {...rest} ref={ref} style={{width: "100%"}} className={error ? "p-invalid" : ""} />
      )}
    />
  )
})

export default Select
