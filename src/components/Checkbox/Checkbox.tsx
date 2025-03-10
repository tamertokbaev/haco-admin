import React from "react"
import {Controller, Control} from "react-hook-form"
import {Checkbox as PrimeCheckbox, CheckboxProps} from "primereact/checkbox"

type Props = Omit<CheckboxProps, "checked" | "onChange"> & {
  label?: string
  name: string
  control: Control<any>
}

const Checkbox: React.FC<Props> = ({label, name, control, ...props}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <div className="flex align-items-center">
          <PrimeCheckbox
            {...props}
            inputRef={field.ref}
            checked={field.value}
            onChange={(e) => field.onChange(e.checked)}
          />
          {label && <label className="ml-2">{label}</label>}
        </div>
      )}
    />
  )
}

export default Checkbox
