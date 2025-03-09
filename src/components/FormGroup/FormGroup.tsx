import React, {FC} from "react"
import s from "./FormGroup.module.scss"
import clsx from "clsx"

type Props = {
  children: React.ReactNode | React.ReactElement
  label?: string
  helperText?: string
  invalid?: boolean
}

const FormGroup: FC<Props> = ({children, label, helperText, invalid}) => {
  return (
    <div className={clsx(s.root, "flex flex-column gap-2")}>
      {label ? <label>{label}</label> : null}
      {children}
      {helperText ? <small className={clsx({[s.error]: invalid})}>{helperText}</small> : null}
    </div>
  )
}

export default FormGroup
