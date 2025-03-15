import React, {FC, useEffect, useRef, useState} from "react"
import Modal from "../../components/Modal/Modal"
import Table, {TableRef, TableRow} from "../../components/Table/Table"
import {ContestPrizeUpdate} from "../../interfaces/interfaces"
import {Button} from "primereact/button"
import {confirmPopup} from "primereact/confirmpopup"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import ContestPrizeAddUpdateModal from "./ContestPrizeAddUpdateModal"

type Props = {
  isOpen: boolean
  handleClose: () => void
  contestPrizes: Array<ContestPrizeUpdate>
  contestId: number
}

const ContestPrizesModal: FC<Props> = ({isOpen, handleClose, contestPrizes, contestId}) => {
  const tableRef = useRef<TableRef>(null)
  const [prizes, setPrizes] = useState(contestPrizes)
  const [contestPrizeEditState, setContestPrizeEditState] = useState<{
    isOpen: boolean
    contestPrize: ContestPrizeUpdate | null
  }>({
    isOpen: false,
    contestPrize: null,
  })

  useEffect(() => {
    setPrizes(contestPrizes)
  }, [contestPrizes])

  const closeModal = () => {
    setContestPrizeEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const rows: Array<TableRow<ContestPrizeUpdate>> = [
    {heading: "Название приза", content: (item) => item.prize_name},
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setContestPrizeEditState({isOpen: true, contestPrize: item})}>
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

  const deleteItem = (contest: ContestPrizeUpdate) => {
    BackendService.deleteContestPrize(contest.contest_prize_id)
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage("Запись успешно удалена!")
          const prizesCopy = [...prizes]
          const removeIndex = prizesCopy.findIndex((prize) => prize.contest_prize_id === contest.contest_prize_id)
          if (removeIndex > -1) {
            prizesCopy.splice(removeIndex, 1)
          }
          setPrizes(prizesCopy)
        } else Toast.displayErrorMessage(res.data.message)
      })
      .catch(() => {
        Toast.displayErrorMessage("Произошла ошибка при удалении записи!")
      })
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Призы контеста">
      <div>
        <div style={{marginBottom: "1rem", display: "flex", justifyContent: "flex-end"}}>
          <Button
            size="small"
            icon="pi pi-plus"
            onClick={() => setContestPrizeEditState({isOpen: true, contestPrize: null})}
          >
            Добавить новую запись
          </Button>
        </div>
        <Table rows={rows} customData={prizes} ref={tableRef} />
        <ContestPrizeAddUpdateModal
          isOpen={contestPrizeEditState.isOpen}
          handleClose={closeModal}
          contestPrize={contestPrizeEditState.contestPrize}
          contestId={contestPrizeEditState.contestPrize?.contest_id || 0}
          onSuccessModify={closeModal}
        />
      </div>
    </Modal>
  )
}

export default ContestPrizesModal
