import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {Hashtag, HashtagCreate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import FileInput from "../../components/FileInput/FileInput"
import {FileUploadSelectEvent} from "primereact/fileupload"
import {convertFileIntoBase64} from "../../utils/file"
import {yupResolver} from "@hookform/resolvers/yup"
import {HashtagValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import Checkbox from "../../components/Checkbox/Checkbox"
import {getImagePath} from "../../utils/image"

type Props = {
  isOpen: boolean
  handleClose: () => void
  hashtag: Hashtag | null
  onSuccessModify: () => void
}

const HashTagAddUpdateModal: FC<Props> = ({isOpen, handleClose, hashtag, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    control,
    formState: {errors},
  } = useForm<HashtagCreate>({resolver: yupResolver(HashtagValidationSchema), defaultValues: {...hashtag}})

  useEffect(() => {
    if (isOpen && hashtag) {
      reset({...hashtag})
    } else {
      reset({name: "", name_ru: "", name_kz: "", is_visible: false})
    }
  }, [isOpen, hashtag])

  const submitForm = (data: HashtagCreate) => {
    setRequestFetching(true)
    const formData = {
      ...data,
    }
    let promiseToExecute = hashtag
      ? BackendService.updateHashtag({...formData, hashtag_id: hashtag.hashtag_id})
      : BackendService.createHashtag(formData)

    promiseToExecute
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage(`Запись успешно ${hashtag ? "отредактирована" : "создана"}!`)
          onSuccessModify()
        } else Toast.displayErrorMessage(`Произошла ошибка при ${hashtag ? "редактировании" : "создании"} записи!`)
      })
      .catch(() => {
        Toast.displayErrorMessage(`Произошла ошибка при ${hashtag ? "редактировании" : "создании"} записи!`)
      })
      .finally(() => {
        setRequestFetching(false)
      })
  }

  const onUploadIcon = async (event: FileUploadSelectEvent) => {
    const file = event.files[0]
    const base64 = await convertFileIntoBase64(file)
    setValue("image_base64", base64)
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`${hashtag ? "Редактирование" : "Создание"} хештега`}>
      <form onSubmit={handleSubmit(submitForm)} style={{padding: "10px 0"}} className="flex flex-col gap-4">
        <FormGroup label="Заголовок" helperText={errors.name?.message} invalid={!!errors.name}>
          <TextField placeholder="Заголовок" {...register("name")} invalid={!!errors.name} />
        </FormGroup>
        <FormGroup label="Заголовок KZ" helperText={errors.name_kz?.message} invalid={!!errors.name_kz}>
          <TextField placeholder="Заголовок KZ" {...register("name_kz")} invalid={!!errors.name_kz} />
        </FormGroup>
        <FormGroup label="Заголовок RU" helperText={errors.name_ru?.message} invalid={!!errors.name_ru}>
          <TextField placeholder="Заголовок RU" {...register("name_ru")} invalid={!!errors.name_ru} />
        </FormGroup>

        <FormGroup helperText={errors.is_visible?.message} invalid={!!errors.is_visible}>
          <Checkbox control={control} name="is_visible" label="Активность" invalid={!!errors.is_visible} />
        </FormGroup>

        <FormGroup label="Иконка" helperText={errors.image_base64?.message} invalid={!!errors.image_base64}>
          <FileInput
            multiple={false}
            accept="image/*"
            onSelect={onUploadIcon}
            uploadedImage={getImagePath(hashtag?.image_path)}
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

export default HashTagAddUpdateModal
