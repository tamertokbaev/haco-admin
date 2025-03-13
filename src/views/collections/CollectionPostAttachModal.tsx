import {Collection, Post, PostsGet} from "../../interfaces/interfaces"
import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import Table, {TableRow} from "../../components/Table/Table"
import {BackendService} from "../../http/service"
import {TabPanel, TabView} from "primereact/tabview"
import {Chip} from "primereact/chip"
import {Toast} from "../../utils/toast"

type Props = {
  isOpen: boolean
  handleClose: () => void
  collection: Collection | null
  onSuccessModify: () => void
}

const PostCollectionType = {
  0: "bestsellers",
  1: "continue_reading",
  2: "partners",
}

const CollectionPostAttachModal: FC<Props> = ({isOpen, handleClose, collection, onSuccessModify}) => {
  const [postsCollection, setPostsCollection] = useState<PostsGet | null>(null)
  const [activeTab, setActiveTab] = useState<number>(0)
  const [selectedPosts, setSelectedPosts] = useState<Array<Post>>([])

  useEffect(() => {
    fetchPostsGet()
  }, [])

  const fetchPostsGet = async () => {
    BackendService.getPosts().then((res) => {
      if (res.data.status) {
        setPostsCollection(res.data.result)
      }
    })
  }

  const rows: TableRow<Post>[] = [
    {
      heading: "Название",
      content: (item) => item.title,
    },
    {
      heading: "Статус",
      content: (item) => item.status,
    },
  ]

  const onTabsChange = (newIndex: number) => {
    setActiveTab(newIndex)
  }

  const onRemovePost = (post: Post) => {
    setSelectedPosts(selectedPosts.filter((selectedPost) => selectedPost.post_id !== post.post_id))
    BackendService.deleteCollectionFromPost({post_id: post.post_id, collection_id: collection!.collection_id}).then(
      (res) => {
        if (res.data.status) {
          onSuccessModify()
          Toast.displaySuccessMessage("Пост успешно отвязан от хештега")
        }
      },
    )
    return true
  }

  const attachPost = async (post: Post | undefined) => {
    if (!collection || !post) return
    if (selectedPosts.find((selectedPost) => selectedPost.post_id === post.post_id)) {
      BackendService.deleteCollectionFromPost({post_id: post.post_id, collection_id: collection?.collection_id}).then(
        (res) => {
          if (res.data.status) {
            onSuccessModify()
            Toast.displaySuccessMessage("Пост успешно отвязан от хештега")
          }
        },
      )
    } else {
      BackendService.attachCollectionToPost({post_id: post.post_id, collection_id: collection?.collection_id}).then(
        (res) => {
          if (res.data.status) {
            onSuccessModify()
            Toast.displaySuccessMessage("Пост успешно привязан к хештегу")
          }
        },
      )
    }
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`Привязка постов к коллекции`}>
      <TabView activeIndex={activeTab} onTabChange={(e) => onTabsChange(e.index)}>
        <TabPanel header="Bestsellers"> </TabPanel>
        <TabPanel header="Continue reading"></TabPanel>
        <TabPanel header="Partners"></TabPanel>
      </TabView>
      <div className="mb-4 flex gap-2 flex-wrap">
        {selectedPosts.map((post) => (
          <Chip label={post.title} removable onRemove={() => onRemovePost(post)} />
        ))}
      </div>
      <div className="max-h-100">
        <Table
          hasSelection
          onItemsSelected={(items) => setSelectedPosts(items)}
          onItemSelect={attachPost}
          selectionItems={selectedPosts}
          rows={rows}
          // @ts-ignore
          customData={postsCollection ? (postsCollection[PostCollectionType[activeTab]] as Post[]) : []}
        />
      </div>
    </Modal>
  )
}

export default CollectionPostAttachModal
