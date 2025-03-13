import React, {useRef, useState} from "react"
import {Button} from "primereact/button"
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup"
import Table, {TableRef, TableRow} from "../../components/Table/Table"
import {Post} from "../../interfaces/interfaces"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import Layout from "../../components/Layout/Layout"
import {AppRoutePageNames, AppRoutes} from "../../routes"
import PostAddUpdateModal from "../../views/posts/PostAddUpdateModal"

const PostsListPage = () => {
  const tableRef = useRef<TableRef>(null)
  const [postEditState, setPostEditState] = useState<{isOpen: boolean; post: Post | null}>({
    isOpen: false,
    post: null,
  })

  const closeModal = () => {
    setPostEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const rows: Array<TableRow<Post>> = [
    {heading: "ID", content: (item) => item.post_id},
    {heading: "Название", content: (item) => item.title},
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setPostEditState({isOpen: true, post: item})}>
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

  const deleteItem = (post: Post) => {
    BackendService.deletePost(post.post_id)
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
    tableRef.current?.forcedRefetchDataTable()
  }

  return (
    <Layout pageTitle={AppRoutePageNames[AppRoutes.posts]}>
      <ConfirmPopup />
      <div style={{marginBottom: "1rem", display: "flex", justifyContent: "flex-end"}}>
        <Button size="small" icon="pi pi-plus" onClick={() => setPostEditState({isOpen: true, post: null})}>
          Добавить новую запись
        </Button>
      </div>
      <Table ref={tableRef} rows={rows} fetchUrlPaginated={BackendService.getPostsV2} />
      <PostAddUpdateModal
        isOpen={postEditState.isOpen}
        handleClose={closeModal}
        post={postEditState.post}
        onSuccessModify={handleForceRefetch}
      />
    </Layout>
  )
}

export default PostsListPage
