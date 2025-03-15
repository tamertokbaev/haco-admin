import React, {FC, useEffect, useRef, useState} from "react"
import Modal from "../../components/Modal/Modal"
import Table, {TableRef, TableRow} from "../../components/Table/Table"
import {ContestBookUpdate} from "../../interfaces/interfaces"
import {Button} from "primereact/button"
import {confirmPopup} from "primereact/confirmpopup"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import ContestBookAddUpdateModal from "./ContestBookAddUpdateModal"

type Props = {
  isOpen: boolean
  handleClose: () => void
  contestBooks: Array<ContestBookUpdate>
  contestId: number
}

const ContestBooksModal: FC<Props> = ({isOpen, handleClose, contestBooks, contestId}) => {
  const tableRef = useRef<TableRef>(null)
  const [books, setBooks] = useState(contestBooks)
  const [contestBookEditState, setContestBookEditState] = useState<{
    isOpen: boolean
    contestBook: ContestBookUpdate | null
  }>({
    isOpen: false,
    contestBook: null,
  })

  useEffect(() => {
    if (!isOpen) {
      setContestBookEditState({isOpen: false, contestBook: null})
    }
  }, [isOpen])

  useEffect(() => {
    setBooks(contestBooks)
  }, [contestBooks])

  const closeModal = () => {
    setContestBookEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const rows: Array<TableRow<ContestBookUpdate>> = [
    {heading: "Название приза", content: (item) => item.title},
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setContestBookEditState({isOpen: true, contestBook: item})}>
          Редактировать
        </Button>
      ),
    },
    {
      heading: "",
      content: (item) => (
        <Button size="small" severity="danger" onClick={(event) => confirmDelete(event, () => deleteItem(item))}>
          Удалить
        </Button>
      ),
    },
  ]

  const confirmDelete = (event: any, onAccept: () => void) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Вы действительно хотите удалить эту запись?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      acceptLabel: "Да",
      rejectLabel: "Нет",
      closeOnEscape: true,
      accept: onAccept,
    })
  }

  const deleteItem = (contest: ContestBookUpdate) => {
    BackendService.deleteContestBook(contest.contest_book_id)
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage("Запись успешно удалена!")
          const prizesCopy = [...books]
          const removeIndex = prizesCopy.findIndex((prize) => prize.contest_book_id === contest.contest_book_id)
          if (removeIndex > -1) {
            prizesCopy.splice(removeIndex, 1)
          }
          setBooks(prizesCopy)
        } else Toast.displayErrorMessage(res.data.message)
      })
      .catch(() => {
        Toast.displayErrorMessage("Произошла ошибка при удалении записи!")
      })
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Записи (book) контеста">
      <div>
        <div style={{marginBottom: "1rem", display: "flex", justifyContent: "flex-end"}}>
          <Button
            size="small"
            icon="pi pi-plus"
            onClick={() => setContestBookEditState({isOpen: true, contestBook: null})}
          >
            Добавить новую запись
          </Button>
        </div>
        <Table rows={rows} customData={books} ref={tableRef} />
        <ContestBookAddUpdateModal
          isOpen={contestBookEditState.isOpen}
          handleClose={closeModal}
          contestBook={contestBookEditState.contestBook}
          contestId={contestId}
          onSuccessModify={handleClose}
        />
      </div>
    </Modal>
  )
}

export default ContestBooksModal
