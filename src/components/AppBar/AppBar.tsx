import React from "react"
import s from "./AppBar.module.scss"

type AppBarProps = {
  title: string
}

const AppBar: React.FC<AppBarProps> = ({title}) => {
  return (
    <header className={s.header}>
      <h1 className={s.title}>{title}</h1>
    </header>
  )
}

export default AppBar
