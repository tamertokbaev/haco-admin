import {useRef, useState} from "react"
import {Button} from "primereact/button"
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup"
import Table, {TableRef, TableRow} from "../../components/Table/Table"
import {Story} from "../../interfaces/interfaces"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import Layout from "../../components/Layout/Layout"
import {AppRoutePageNames, AppRoutes} from "../../routes"
import StoriesAddUpdateModal from "../../views/stories/StoriesAddUpdateModal"
import StoryPagesEditModal from "../../views/stories/StoryPagesEditModal"

const StoriesListPage = () => {
  const tableRef = useRef<TableRef>(null)
  const [storyEditState, setStoryEditState] = useState<{isOpen: boolean; story: Story | null}>({
    isOpen: false,
    story: null,
  })
  const [storyPagesEditState, setStoryPagesEditState] = useState<{isOpen: boolean; story: Story | null}>({
    isOpen: false,
    story: null,
  })

  const closeModal = () => {
    setStoryEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const closeStoryPageModal = () => {
    setStoryPagesEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const rows: Array<TableRow<Story>> = [
    {heading: "ID", content: (item) => item.stories_id},
    {heading: "Название", content: (item) => item.title},
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setStoryEditState({isOpen: true, story: item})}>
          Редактировать
        </Button>
      ),
    },
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setStoryPagesEditState({isOpen: true, story: item})}>
          Редактировать страницы истории
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

  const deleteItem = (product: Story) => {
    BackendService.deleteStory(product.stories_id)
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
    <Layout pageTitle={AppRoutePageNames[AppRoutes.stories]}>
      <ConfirmPopup />
      <div style={{marginBottom: "1rem", display: "flex", justifyContent: "flex-end"}}>
        <Button size="small" icon="pi pi-plus" onClick={() => setStoryEditState({isOpen: true, story: null})}>
          Добавить новую запись
        </Button>
      </div>
      <Table ref={tableRef} rows={rows} fetchUrl={BackendService.getStoriesList} />
      <StoriesAddUpdateModal
        isOpen={storyEditState.isOpen}
        handleClose={closeModal}
        story={storyEditState.story}
        onSuccessModify={onSuccessModify}
      />
      <StoryPagesEditModal
        isOpen={storyPagesEditState.isOpen}
        handleClose={closeStoryPageModal}
        story={storyPagesEditState.story}
      />
    </Layout>
  )
}

export default StoriesListPage
