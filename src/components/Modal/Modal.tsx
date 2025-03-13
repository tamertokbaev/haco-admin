import React, {FC} from "react"
import {Dialog} from "primereact/dialog"

type Props = {
  isOpen: boolean
  handleClose: () => void
  title: string
  children: React.ReactNode | React.ReactElement
  footerContent?: React.ReactNode | React.ReactElement
}

const Modal: FC<Props> = ({isOpen, handleClose, title, children, footerContent}) => {
  return (
    <Dialog
      header={title}
      visible={isOpen}
      style={{width: "50vw"}}
      breakpoints={{"960px": "75vw", "641px": "100vw"}}
      onHide={handleClose}
      footer={footerContent}
      contentStyle={{paddingBottom: "10px"}}
      blockScroll
      dismissableMask
      maximizable
    >
      <div className="m-0">{children}</div>
    </Dialog>
  )
}

export default Modal
