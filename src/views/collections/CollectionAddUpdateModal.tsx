import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {Collection, CollectionCreate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import FileInput from "../../components/FileInput/FileInput"
import {FileUploadSelectEvent} from "primereact/fileupload"
import {convertFileIntoBase64} from "../../utils/file"
import {yupResolver} from "@hookform/resolvers/yup"
import {CollectionValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import Checkbox from "../../components/Checkbox/Checkbox"
import {getImagePath} from "../../utils/image"

type Props = {
  isOpen: boolean
  handleClose: () => void
  collection: Collection | null
  onSuccessModify: () => void
}

const HashTagAddUpdateModal: FC<Props> = ({isOpen, handleClose, collection, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    control,
    formState: {errors},
    // @ts-ignore
  } = useForm<CollectionCreate>({resolver: yupResolver(CollectionValidationSchema), defaultValues: {...collection}})

  useEffect(() => {
    if (isOpen && collection) {
      reset({...collection})
    } else {
      reset({name: "", name_ru: "", name_kz: "", is_recommendation: false})
    }
  }, [isOpen, collection])

  const submitForm = (data: CollectionCreate) => {
    setRequestFetching(true)
    const formData = {
      ...data,
    }
    let promiseToExecute = collection
      ? BackendService.updateCollection({...formData, collection_id: collection.collection_id})
      : BackendService.createCollection(formData)

    promiseToExecute
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage(`Запись успешно ${collection ? "отредактирована" : "создана"}!`)
          onSuccessModify()
        } else Toast.displayErrorMessage(`Произошла ошибка при ${collection ? "редактировании" : "создании"} записи!`)
      })
      .catch(() => {
        Toast.displayErrorMessage(`Произошла ошибка при ${collection ? "редактировании" : "создании"} записи!`)
      })
      .finally(() => {
        setRequestFetching(false)
      })
  }

  const onUploadIcon = async (event: FileUploadSelectEvent, type: "image" | "image_ru" | "image_kz") => {
    const file = event.files[0]
    const base64 = await convertFileIntoBase64(file)
    setValue(type, {file: base64, filename: file.name})
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`${collection ? "Редактирование" : "Создание"} хештега`}>
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

        <FormGroup helperText={errors.is_recommendation?.message} invalid={!!errors.is_recommendation}>
          <Checkbox
            control={control}
            name="is_recommendation"
            label="Рекомендации"
            invalid={!!errors.is_recommendation}
          />
        </FormGroup>

        <FormGroup label="Иконка" helperText={errors.image?.message} invalid={!!errors.image}>
          <FileInput
            multiple={false}
            accept="image/*"
            onSelect={(e) => onUploadIcon(e, "image")}
            uploadedImage={getImagePath(collection?.image_path)}
          />
        </FormGroup>
        <FormGroup label="Иконка KZ" helperText={errors.image_kz?.message} invalid={!!errors.image_kz}>
          <FileInput
            multiple={false}
            accept="image/*"
            onSelect={(e) => onUploadIcon(e, "image_kz")}
            uploadedImage={getImagePath(collection?.image_path_kz)}
          />
        </FormGroup>
        <FormGroup label="Иконка RU" helperText={errors.image_ru?.message} invalid={!!errors.image_ru}>
          <FileInput
            multiple={false}
            accept="image/*"
            onSelect={(e) => onUploadIcon(e, "image_ru")}
            uploadedImage={getImagePath(collection?.image_path_ru)}
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
