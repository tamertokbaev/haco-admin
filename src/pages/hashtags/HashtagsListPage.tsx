import {useRef, useState} from "react"
import {Button} from "primereact/button"
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup"
import Table, {TableRef, TableRow} from "../../components/Table/Table"
import {Hashtag} from "../../interfaces/interfaces"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import Layout from "../../components/Layout/Layout"
import {AppRoutePageNames, AppRoutes} from "../../routes"
import HashTagAddUpdateModal from "../../views/hashtags/HashtagAddUpdateModal"
import HashTagPostAttachModal from "../../views/hashtags/HashtagPostAttachModal"

const HastagsListPage = () => {
  const tableRef = useRef<TableRef>(null)
  const [hashtagEditState, setHashtagEditState] = useState<{isOpen: boolean; hashtag: Hashtag | null}>({
    isOpen: false,
    hashtag: null,
  })
  const [hashtagPostAttachState, setHashtagPostAttachState] = useState<{isOpen: boolean; hashtag: Hashtag | null}>({
    isOpen: false,
    hashtag: null,
  })

  const closeModal = () => {
    setHashtagEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const closeHashtagPostAttachModal = () => {
    setHashtagPostAttachState((prevState) => ({...prevState, isOpen: false}))
  }

  const rows: Array<TableRow<Hashtag>> = [
    {heading: "ID", content: (item) => item.hashtag_id},
    {heading: "Название", content: (item) => item.name},
    {heading: "Посты", content: (item) => item.posts?.map((item) => item.title).join(", ") || "-"},
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setHashtagEditState({isOpen: true, hashtag: item})}>
          Редактировать
        </Button>
      ),
    },
    {
      heading: "",
      content: (item) => (
        <Button size="small" severity="info" onClick={() => setHashtagPostAttachState({isOpen: true, hashtag: item})}>
          Привязать посты
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

  const deleteItem = (product: Hashtag) => {
    BackendService.deleteHashtag(product.hashtag_id)
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
    <Layout pageTitle={AppRoutePageNames[AppRoutes.hashtags]}>
      <ConfirmPopup />
      <div style={{marginBottom: "1rem", display: "flex", justifyContent: "flex-end"}}>
        <Button size="small" icon="pi pi-plus" onClick={() => setHashtagEditState({isOpen: true, hashtag: null})}>
          Добавить новую запись
        </Button>
      </div>
      <Table ref={tableRef} rows={rows} fetchUrl={BackendService.getHashtagsList} />
      <HashTagAddUpdateModal
        isOpen={hashtagEditState.isOpen}
        handleClose={closeModal}
        hashtag={hashtagEditState.hashtag}
        onSuccessModify={onSuccessModify}
      />
      <HashTagPostAttachModal
        isOpen={hashtagPostAttachState.isOpen}
        handleClose={closeHashtagPostAttachModal}
        hashtag={hashtagPostAttachState.hashtag}
        onSuccessModify={onSuccessModify}
      />
    </Layout>
  )
}

export default HastagsListPage
