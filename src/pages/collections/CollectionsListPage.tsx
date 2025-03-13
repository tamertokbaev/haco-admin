import {useRef, useState} from "react"
import {Button} from "primereact/button"
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup"
import Table, {TableRef, TableRow} from "../../components/Table/Table"
import {Collection} from "../../interfaces/interfaces"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import Layout from "../../components/Layout/Layout"
import {AppRoutePageNames, AppRoutes} from "../../routes"
import CollectionPostAttachModal from "../../views/collections/CollectionPostAttachModal"
import CollectionAddUpdateModal from "../../views/collections/CollectionAddUpdateModal"

const CollectionsListPage = () => {
  const tableRef = useRef<TableRef>(null)
  const [collectionEditState, setCollectionEditState] = useState<{isOpen: boolean; collection: Collection | null}>({
    isOpen: false,
    collection: null,
  })
  const [collectionPostAttachState, setCollectionPostAttachState] = useState<{
    isOpen: boolean
    collection: Collection | null
  }>({
    isOpen: false,
    collection: null,
  })

  const closeModal = () => {
    setCollectionEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const closeHashtagPostAttachModal = () => {
    setCollectionPostAttachState((prevState) => ({...prevState, isOpen: false}))
  }

  const rows: Array<TableRow<Collection>> = [
    {heading: "ID", content: (item) => item.collection_id},
    {heading: "Название", content: (item) => item.name},
    {heading: "Посты", content: (item) => item.posts?.map((item) => item.title).join(", ") || "-"},
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setCollectionEditState({isOpen: true, collection: item})}>
          Редактировать
        </Button>
      ),
    },
    {
      heading: "",
      content: (item) => (
        <Button
          size="small"
          severity="info"
          onClick={() => setCollectionPostAttachState({isOpen: true, collection: item})}
        >
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

  const deleteItem = (collection: Collection) => {
    BackendService.deleteCollection(collection.collection_id)
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
    <Layout pageTitle={AppRoutePageNames[AppRoutes.collections]}>
      <ConfirmPopup />
      <div style={{marginBottom: "1rem", display: "flex", justifyContent: "flex-end"}}>
        <Button size="small" icon="pi pi-plus" onClick={() => setCollectionEditState({isOpen: true, collection: null})}>
          Добавить новую запись
        </Button>
      </div>
      <Table ref={tableRef} rows={rows} fetchUrl={BackendService.getCollectionsList} />
      <CollectionAddUpdateModal
        isOpen={collectionEditState.isOpen}
        handleClose={closeModal}
        collection={collectionEditState.collection}
        onSuccessModify={onSuccessModify}
      />
      <CollectionPostAttachModal
        isOpen={collectionPostAttachState.isOpen}
        handleClose={closeHashtagPostAttachModal}
        collection={collectionPostAttachState.collection}
        onSuccessModify={onSuccessModify}
      />
    </Layout>
  )
}

export default CollectionsListPage
