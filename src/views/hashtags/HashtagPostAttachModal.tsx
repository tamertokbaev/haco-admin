import {Hashtag} from "../../interfaces/interfaces"
import React, {FC} from "react"
import Modal from "../../components/Modal/Modal"
import Table from "../../components/Table/Table"
import {BackendService} from "../../http/service"

type Props = {
  isOpen: boolean
  handleClose: () => void
  hashtag: Hashtag | null
  onSuccessModify: () => void
}

const HashTagPostAttachModal: FC<Props> = ({isOpen, handleClose, hashtag, onSuccessModify}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`Привязка постов к хештегу`}>
      <Table rows={[]} fetchUrl={BackendService.getPosts} hasSelection />
    </Modal>
  )
}

export default HashTagPostAttachModal
