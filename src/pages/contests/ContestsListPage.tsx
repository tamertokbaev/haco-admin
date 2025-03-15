import React, {useRef, useState} from "react"
import {Button} from "primereact/button"
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup"
import Table, {TableRef, TableRow} from "../../components/Table/Table"
import {Contest} from "../../interfaces/interfaces"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import Layout from "../../components/Layout/Layout"
import {AppRoutePageNames, AppRoutes} from "../../routes"
import ContestAddUpdateModal from "../../views/contests/ContestAddUpdateModal"
import ContestPrizesModal from "../../views/contests/ContestPrizesModal"
import ContestBooksModal from "../../views/contests/ContestBooksModal"

const ContestsListPage = () => {
  const tableRef = useRef<TableRef>(null)
  const [contestEditState, setContestEditState] = useState<{isOpen: boolean; contest: Contest | null}>({
    isOpen: false,
    contest: null,
  })
  const [contestPrizesEditState, setContestPrizesEditState] = useState<{
    isOpen: boolean
    contest: Contest | null
  }>({
    isOpen: false,
    contest: null,
  })
  const [contestBooksEditState, setContestBooksEditState] = useState<{
    isOpen: boolean
    contest: Contest | null
  }>({
    isOpen: false,
    contest: null,
  })

  const closeModal = () => {
    setContestEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const closeContestPrizesEditModal = () => {
    setContestPrizesEditState((prevState) => ({...prevState, isOpen: false}))
    handleForceRefetch()
  }

  const closeContestBooksEditModal = () => {
    setContestBooksEditState((prevState) => ({...prevState, isOpen: false}))
    handleForceRefetch()
  }

  const rows: Array<TableRow<Contest>> = [
    {heading: "ID", content: (item) => item.contest_id},
    {heading: "Название", content: (item) => item.code},
    {heading: "Сапфиры", content: (item) => item.consolation_prize_sapphire},
    {heading: "Активный", content: (item) => (item.is_active ? "Да" : "Нет")},
    {heading: "Время начала", content: (item) => (item.start_time ? new Date(item.start_time).toLocaleString() : "-")},
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setContestEditState({isOpen: true, contest: item})}>
          Редактировать
        </Button>
      ),
    },
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setContestPrizesEditState({isOpen: true, contest: item})}>
          Редактировать призы
        </Button>
      ),
    },
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setContestBooksEditState({isOpen: true, contest: item})}>
          Редактировать записи
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

  const deleteItem = (contest: Contest) => {
    BackendService.deleteContest(contest.contest_id)
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage("Запись успешно удалена!")
          handleForceRefetch()
        } else Toast.displayErrorMessage(res.data.message)
      })
      .catch(() => {
        Toast.displayErrorMessage("Произошла ошибка при удалении записи!")
      })
  }

  const handleForceRefetch = () => {
    tableRef.current?.forcedRefetchData()
  }

  const onSuccessModify = () => {
    closeModal()
    handleForceRefetch()
  }

  return (
    <Layout pageTitle={AppRoutePageNames[AppRoutes.contests]}>
      <ConfirmPopup />
      <div style={{marginBottom: "1rem", display: "flex", justifyContent: "flex-end"}}>
        <Button size="small" icon="pi pi-plus" onClick={() => setContestEditState({isOpen: true, contest: null})}>
          Добавить новую запись
        </Button>
      </div>
      <Table ref={tableRef} rows={rows} fetchUrl={BackendService.getContestList} />
      <ContestAddUpdateModal
        isOpen={contestEditState.isOpen}
        handleClose={closeModal}
        contest={contestEditState.contest}
        onSuccessModify={onSuccessModify}
      />
      <ContestPrizesModal
        isOpen={contestPrizesEditState.isOpen}
        handleClose={closeContestPrizesEditModal}
        contestPrizes={contestPrizesEditState.contest?.contest_prizes || []}
        contestId={contestPrizesEditState.contest?.contest_id ?? 0}
      />
      <ContestBooksModal
        isOpen={contestBooksEditState.isOpen}
        handleClose={closeContestBooksEditModal}
        // @ts-ignore
        contestBooks={contestPrizesEditState.contest?.contest_books || []}
        contestId={contestPrizesEditState.contest?.contest_id ?? 0}
      />
    </Layout>
  )
}

export default ContestsListPage
