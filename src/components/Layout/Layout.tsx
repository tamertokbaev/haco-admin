import React, {FC} from "react"
import s from "./Layout.module.scss"
import Sidebar from "../Sidebar/Sidebar"
import AppBar from "../AppBar/AppBar"

type Props = {
  pageTitle: string
  children: React.ReactNode | React.ReactElement
}

const Layout: FC<Props> = ({pageTitle, children}) => {
  return (
    <div className={s.root}>
      <Sidebar />
      <main className={s.pageRoot}>
        <AppBar title={pageTitle} />
        <div className={s.content}>{children}</div>
      </main>
    </div>
  )
}

export default Layout
