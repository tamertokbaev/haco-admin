import React, {forwardRef, RefObject} from "react"
import {InputText, InputTextProps} from "primereact/inputtext"

type Props = InputTextProps

const TextField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <InputText ref={ref as RefObject<InputText>} width="100%" {...props} />
})

export default TextField
