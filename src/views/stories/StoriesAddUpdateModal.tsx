import React, {FC, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {Story, StoryCreate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import DatePicker from "../../components/DatePicker/DatePicker"
import FileInput from "../../components/FileInput/FileInput"
import {FileUploadHandlerEvent} from "primereact/fileupload"
import {convertFileIntoBase64} from "../../utils/file"
import {yupResolver} from "@hookform/resolvers/yup"
import {StoryValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"

type Props = {
  isOpen: boolean
  handleClose: () => void
  story: Story | null
  onSuccessModify: () => void
}

const StoryAddUpdateModal: FC<Props> = ({isOpen, handleClose, story, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    formState: {errors},
  } = useForm<StoryCreate>({resolver: yupResolver(StoryValidationSchema), defaultValues: {...story}})

  const submitForm = (data: StoryCreate) => {
    setRequestFetching(true)
    BackendService.createStory({
      ...data,
      start_time: new Date(data.start_time).toISOString(),
      end_time: new Date(data.end_time).toISOString(),
    })
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
    setValue("icon", {file: base64, filename: fileName})
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`${story ? "Редактирование" : "Создание"} истории`}>
      <form onSubmit={handleSubmit(submitForm)} style={{padding: "10px 0"}} className="flex flex-col gap-4">
        <FormGroup label="Заголовок" helperText={errors.title?.message} invalid={!!errors.title}>
          <TextField placeholder="Заголовок" {...register("title")} invalid={!!errors.title} />
        </FormGroup>
        <FormGroup label="Время начала" helperText={errors.start_time?.message} invalid={!!errors.start_time}>
          <DatePicker placeholder="Время начала" {...register("start_time")} invalid={!!errors.start_time} />
        </FormGroup>
        <FormGroup label="Время окончания" helperText={errors.end_time?.message} invalid={!!errors.end_time}>
          <DatePicker placeholder="Время окончания" {...register("end_time")} invalid={!!errors.end_time} />
        </FormGroup>
        <FormGroup label="Иконка" helperText={errors.icon?.file?.message} invalid={!!errors.icon?.file}>
          <FileInput multiple={false} accept="image/*" uploadHandler={onUploadIcon} />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px"}}>
          <Button label="Отменить" type="button" onClick={handleClose} autoFocus className="p-button-text" />
          <Button label="Сохранить" type="submit" loading={requestFetching} />
        </div>
      </form>
    </Modal>
  )
}

export default StoryAddUpdateModal
