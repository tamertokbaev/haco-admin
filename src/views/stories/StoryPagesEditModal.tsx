import React, {useEffect, useState} from "react"
import {Story, StoryPage} from "../../interfaces/interfaces"
import Modal from "../../components/Modal/Modal"
import s from "./StoryPagesEditModal.module.scss"
import {getImagePath} from "../../utils/image"
import {Button} from "primereact/button"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import {confirmPopup} from "primereact/confirmpopup"
import StoryPageAddUpdateModal from "./StoryPageAddUpdateModal"

type Props = {
  isOpen: boolean
  handleClose: () => void
  story: Story | null
}

const StoryPagesEditModal: React.FC<Props> = ({isOpen, handleClose, story}) => {
  const [storyPages, setStoryPages] = React.useState<StoryPage[]>([])
  const [storyPageEditState, setStoryPageEditState] = useState<{isOpen: boolean; storyPage: StoryPage | null}>({
    isOpen: false,
    storyPage: null,
  })

  useEffect(() => {
    fetchStory()
  }, [story])

  const fetchStory = () => {
    if (!story) return
    BackendService.getStory(story.stories_id).then((res) => {
      if (res.data.status) {
        setStoryPages(res.data.result.story_pages)
      } else Toast.displayErrorMessage(res.data.message)
    })
  }

  const closeModal = () => {
    setStoryPageEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const deleteItem = (storyPage: StoryPage) => {
    BackendService.deleteStoryPage(storyPage.story_page_id)
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage("Запись успешно удалена!")
          fetchStory()
        } else Toast.displayErrorMessage(res.data.message)
      })
      .catch(() => {
        Toast.displayErrorMessage("Произошла ошибка при удалении записи!")
      })
  }

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

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Редактирование страниц истории">
      <div className={s.root}>
        <div>
          <Button>Добавить страницу</Button>
        </div>
        <div className={s.container}>
          {storyPages
            .sort((a, b) => (a.page_order > b.page_order ? 1 : -1))
            .map((storyPage) => (
              <div key={storyPage.story_page_id} className={s.page}>
                <div className={s.header}>
                  <span className={s.order}>Страница {storyPage.page_order}</span>
                  <span className={s.createdAt}>{new Date(storyPage.created_at).toLocaleDateString()}</span>
                </div>
                <div className={s.content}>
                  <img
                    src={getImagePath(storyPage.image_path)}
                    alt={`Story Page ${storyPage.page_order}`}
                    className={s.image}
                  />
                  <p className={s.text}>{storyPage.text}</p>
                </div>
                <div className={s.footer}>
                  {storyPage.is_readed ? (
                    <span className={s.read}>Прочитано</span>
                  ) : (
                    <span className={s.unread}>Не прочитано</span>
                  )}
                </div>
                <div className={s.actions}>
                  <Button
                    size="small"
                    outlined
                    style={{justifyContent: "center"}}
                    onClick={() => setStoryPageEditState({isOpen: true, storyPage: storyPage})}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="small"
                    outlined
                    severity="danger"
                    style={{justifyContent: "center"}}
                    onClick={(event) => confirmDelete(event, () => deleteItem(storyPage))}
                  >
                    Удалить
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <StoryPageAddUpdateModal
          isOpen={storyPageEditState.isOpen}
          handleClose={closeModal}
          storyPage={storyPageEditState.storyPage}
          onSuccessModify={fetchStory}
        />
      </div>
    </Modal>
  )
}

export default StoryPagesEditModal
