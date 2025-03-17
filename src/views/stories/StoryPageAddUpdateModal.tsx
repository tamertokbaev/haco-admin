import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {StoryPage, StoryPageCreate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import FileInput from "../../components/FileInput/FileInput"
import {FileUploadHandlerEvent} from "primereact/fileupload"
import {convertFileIntoBase64} from "../../utils/file"
import {yupResolver} from "@hookform/resolvers/yup"
import {StoryPageValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import {getImagePath} from "../../utils/image"

type Props = {
  isOpen: boolean
  handleClose: () => void
  storyPage: StoryPage | null
  onSuccessModify: () => void
}

const StoryPageAddUpdateModal: FC<Props> = ({isOpen, handleClose, storyPage, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: {errors},
    // @ts-ignore
  } = useForm<StoryPageCreate>({resolver: yupResolver(StoryPageValidationSchema), defaultValues: {...storyPage}})

  useEffect(() => {
    if (isOpen && storyPage) {
      reset({
        text: storyPage.text,
        page_order: 1,
        is_readed: storyPage.is_readed,
      })
    } else {
      reset({
        text: "",
        page_order: 1,
        is_readed: false,
      })
    }
  }, [isOpen, storyPage])

  const submitForm = (data: StoryPageCreate) => {
    setRequestFetching(true)
    const formData = {
      ...data,
    }
    let promiseToExecute = storyPage
      ? BackendService.updateStoryPage({...formData, story_page_id: storyPage.story_page_id})
      : BackendService.createStoryPage(formData)

    promiseToExecute
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage("Запись успешно создана!")
          onSuccessModify()
        } else Toast.displayErrorMessage("Произошла ошибка при создании записи!")
      })
      .catch(() => {
        Toast.displayErrorMessage("Произошла ошибка при создании записи!")
      })
      .finally(() => {
        setRequestFetching(false)
      })
  }

  const onUploadIcon = async (event: FileUploadHandlerEvent) => {
    const file = event.files[0]
    const base64 = await convertFileIntoBase64(file)
    const fileName = file.name
    setValue("image", {file: base64, filename: fileName})
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title={`${storyPage ? "Редактирование" : "Создание"} страницы истории`}
    >
      <form onSubmit={handleSubmit(submitForm)} style={{padding: "10px 0"}} className="flex flex-col gap-4">
        <FormGroup label="Текст" helperText={errors.text?.message} invalid={!!errors.text}>
          <TextField placeholder="Текст" {...register("text")} invalid={!!errors.text} />
        </FormGroup>
        <FormGroup label="Порядок" helperText={errors.page_order?.message} invalid={!!errors.page_order}>
          <TextField placeholder="Порядок" {...register("page_order")} invalid={!!errors.page_order} />
        </FormGroup>
        <FormGroup label="Иконка" helperText={errors.image?.file?.message} invalid={!!errors.image?.file}>
          <FileInput
            multiple={false}
            accept="image/*"
            uploadHandler={onUploadIcon}
            uploadedImage={getImagePath(storyPage?.image_path)}
          />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px"}}>
          <Button label="Отменить" type="button" onClick={handleClose} autoFocus className="p-button-text" />
          <Button label="Сохранить" type="submit" loading={requestFetching} />
        </div>
      </form>
    </Modal>
  )
}

export default StoryPageAddUpdateModal
