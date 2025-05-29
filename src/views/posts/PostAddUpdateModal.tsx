import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {Post, PostCreate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import {FileUploadSelectEvent} from "primereact/fileupload"
import {convertFileIntoBase64} from "../../utils/file"
import {yupResolver} from "@hookform/resolvers/yup"
import {PostValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import FileInput from "../../components/FileInput/FileInput"
import {getImagePath} from "../../utils/image"

type Props = {
  isOpen: boolean
  handleClose: () => void
  post: Post | null
  onSuccessModify: () => void
}

const PostAddUpdateModal: FC<Props> = ({isOpen, handleClose, post, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    control,
    formState: {errors},
    // @ts-ignore
  } = useForm<PostCreate>({resolver: yupResolver(PostValidationSchema), defaultValues: {...post}})

  useEffect(() => {
    if (isOpen && post) {
      reset({...post})
    } else {
      reset({})
    }
  }, [isOpen, post])

  const submitForm = (data: PostCreate) => {
    setRequestFetching(true)
    const formData = {
      ...data,
    }
    let promiseToExecute = post
      ? BackendService.updatePost({...formData, post_id: post.post_id})
      : BackendService.createPost(formData)

    promiseToExecute
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage(`Запись успешно ${post ? "отредактирована" : "создана"}!`)
          onSuccessModify()
        } else Toast.displayErrorMessage(`Произошла ошибка при ${post ? "редактировании" : "создании"} записи!`)
      })
      .catch(() => {
        Toast.displayErrorMessage(`Произошла ошибка при ${post ? "редактировании" : "создании"} записи!`)
      })
      .finally(() => {
        setRequestFetching(false)
      })
  }

  const onUploadIcon = async (event: FileUploadSelectEvent, type: "logo" | "image") => {
    const file = event.files[0]
    const base64 = await convertFileIntoBase64(file)
    setValue(type, {file: base64, filename: file.name})
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`${post ? "Редактирование" : "Создание"} поста`}>
      <form onSubmit={handleSubmit(submitForm)} style={{padding: "10px 0"}} className="flex flex-col gap-4">
        <FormGroup label="Заголовок" helperText={errors.title?.message} invalid={!!errors.title}>
          <TextField placeholder="Заголовок" {...register("title")} invalid={!!errors.title} />
        </FormGroup>
        <FormGroup
          label="Краткое описание"
          helperText={errors.short_description?.message}
          invalid={!!errors.short_description}
        >
          <TextField
            placeholder="Краткое описание"
            {...register("short_description")}
            invalid={!!errors.short_description}
          />
        </FormGroup>
        <FormGroup label="Содержимое" helperText={errors.body?.message} invalid={!!errors.body}>
          <TextField placeholder="Содержимое" {...register("body")} invalid={!!errors.body} />
        </FormGroup>
        <FormGroup label="Компания" helperText={errors.company?.message} invalid={!!errors.company}>
          <TextField placeholder="Компания" {...register("company")} invalid={!!errors.company} />
        </FormGroup>
        <FormGroup label="Язык" helperText={errors.language?.message} invalid={!!errors.language}>
          <TextField placeholder="Язык" {...register("language")} invalid={!!errors.language} />
        </FormGroup>
        <FormGroup label="Сапфиры" helperText={errors.sapphire?.message} invalid={!!errors.sapphire}>
          <TextField placeholder="Сапфиры" {...register("sapphire")} invalid={!!errors.sapphire} />
        </FormGroup>
        <FormGroup label="Кол-во очков" helperText={errors.point?.message} invalid={!!errors.point}>
          <TextField placeholder="Кол-во очков" {...register("point")} invalid={!!errors.point} />
        </FormGroup>
        <FormGroup label="Время квиза" helperText={errors.quiz_time?.message} invalid={!!errors.quiz_time}>
          <TextField placeholder="Время квиза" {...register("quiz_time")} invalid={!!errors.quiz_time} />
        </FormGroup>
        <FormGroup label="Время чтения" helperText={errors.read_time?.message} invalid={!!errors.read_time}>
          <TextField placeholder="Время чтения" {...register("read_time")} invalid={!!errors.read_time} />
        </FormGroup>
        <FormGroup label="Статус рейтинга" helperText={errors.rating_status?.message} invalid={!!errors.rating_status}>
          <TextField placeholder="Статус рейтинга" {...register("rating_status")} invalid={!!errors.rating_status} />
        </FormGroup>
        <FormGroup label="Логотип" helperText={errors.logo?.message} invalid={!!errors.logo}>
          {post?.images?.[0]?.url && (
            <img
              src={getImagePath(post.images[0].url)}
              alt="Логотип"
              style={{width: "100px", height: "auto", marginBottom: "8px", borderRadius: "4px"}}
            />
          )}
          <FileInput multiple={false} accept="image/*" onSelect={(e) => onUploadIcon(e, "logo")} />
        </FormGroup>
        <FormGroup label="Изображение" helperText={errors.image?.message} invalid={!!errors.image}>
          {post?.images?.[1]?.url && (
            <img
              src={getImagePath(post.images[1].url)}
              alt="Логотип"
              style={{width: "100px", height: "auto", marginBottom: "8px", borderRadius: "4px"}}
            />
          )}
          <FileInput multiple={false} accept="image/*" onSelect={(e) => onUploadIcon(e, "image")} />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px"}}>
          <Button label="Отменить" type="button" onClick={handleClose} autoFocus className="p-button-text" />
          <Button label="Сохранить" type="submit" loading={requestFetching} />
        </div>
      </form>
    </Modal>
  )
}

export default PostAddUpdateModal
