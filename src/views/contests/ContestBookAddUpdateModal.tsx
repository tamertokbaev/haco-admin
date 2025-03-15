import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {ContestBookCreate, ContestBookUpdate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import {yupResolver} from "@hookform/resolvers/yup"
import {ContestBookValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import FileInput from "../../components/FileInput/FileInput"
import {FileUploadHandlerEvent} from "primereact/fileupload"
import {convertFileIntoBase64} from "../../utils/file"

type Props = {
  isOpen: boolean
  handleClose: () => void
  contestBook: ContestBookUpdate | null
  contestId: number
  onSuccessModify: () => void
}

const ContestBookAddUpdateModal: FC<Props> = ({isOpen, handleClose, contestBook, contestId, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: {errors},
  } = useForm<ContestBookCreate>({
    // @ts-ignore
    resolver: yupResolver(ContestBookValidationSchema),
    defaultValues: {...contestBook},
  })

  useEffect(() => {
    if (isOpen && contestBook) {
      reset({
        ...contestBook,
      })
    } else {
      const defaultValues: ContestBookUpdate = {
        body: "",
        body_en: "",
        body_kz: "",
        contest_book_id: 0,
        contest_coins: 0,
        contest_id: contestId,
        count_of_questions: 0,
        day_number: 0,
        description: "",
        description_en: "",
        description_kz: "",
        image: null,
        point: 0,
        status: "",
        title: "",
        title_en: "",
        title_kz: "",
      }
      reset(defaultValues)
    }
  }, [isOpen, contestBook])

  const submitForm = (data: ContestBookCreate) => {
    setRequestFetching(true)
    const formData = {
      ...data,
    }
    let promiseToExecute = contestBook
      ? BackendService.updateContestBook({
          ...formData,
          contest_book_id: contestBook.contest_book_id,
          contest_id: contestId,
        })
      : BackendService.createContestBook({...formData, contest_id: contestId})

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
    setValue("image", {file: base64, filename: file.name})
  }

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      title={`${contestBook ? "Редактирование" : "Создание"} записи контеста`}
    >
      <form onSubmit={handleSubmit(submitForm)} style={{padding: "10px 0"}} className="flex flex-col gap-4">
        <FormGroup label="Содержание" helperText={errors.body?.message} invalid={!!errors.body}>
          <TextField placeholder="Содержание" {...register("body")} invalid={!!errors.body} />
        </FormGroup>
        <FormGroup label="Содержание KZ" helperText={errors.body_kz?.message} invalid={!!errors.body_kz}>
          <TextField placeholder="Содержание KZ" {...register("body_kz")} invalid={!!errors.body_kz} />
        </FormGroup>
        <FormGroup label="Содержание EN" helperText={errors.body_en?.message} invalid={!!errors.body_en}>
          <TextField placeholder="Содержание EN" {...register("body_en")} invalid={!!errors.body_en} />
        </FormGroup>
        <FormGroup
          label="Монеты за контест"
          helperText={errors.contest_coins?.message}
          invalid={!!errors.contest_coins}
        >
          <TextField placeholder="Монеты за контест" {...register("contest_coins")} invalid={!!errors.contest_coins} />
        </FormGroup>
        <FormGroup
          label="Кол-во вопросов"
          helperText={errors.count_of_questions?.message}
          invalid={!!errors.count_of_questions}
        >
          <TextField
            placeholder="Кол-во вопросов"
            {...register("count_of_questions")}
            invalid={!!errors.count_of_questions}
          />
        </FormGroup>
        <FormGroup label="День" helperText={errors.day_number?.message} invalid={!!errors.day_number}>
          <TextField placeholder="День" {...register("day_number")} invalid={!!errors.day_number} />
        </FormGroup>
        <FormGroup label="Иконка" helperText={errors.image?.message} invalid={!!errors.image}>
          <FileInput multiple={false} accept="image/*" uploadHandler={(e) => onUploadIcon(e)} />
        </FormGroup>
        <FormGroup label="Очки" helperText={errors.point?.message} invalid={!!errors.point}>
          <TextField placeholder="Очки" {...register("point")} invalid={!!errors.point} />
        </FormGroup>
        <FormGroup label="Статус" helperText={errors.status?.message} invalid={!!errors.status}>
          <TextField placeholder="Статус" {...register("status")} invalid={!!errors.status} />
        </FormGroup>
        <FormGroup label="Заголовок" helperText={errors.title?.message} invalid={!!errors.title}>
          <TextField placeholder="Заголовок" {...register("title")} invalid={!!errors.title} />
        </FormGroup>
        <FormGroup label="Заголовок EN" helperText={errors.title_en?.message} invalid={!!errors.title_en}>
          <TextField placeholder="Заголовок EN" {...register("title_en")} invalid={!!errors.title_en} />
        </FormGroup>
        <FormGroup label="Заголовок KZ" helperText={errors.title_kz?.message} invalid={!!errors.title_kz}>
          <TextField placeholder="Заголовок KZ" {...register("title_kz")} invalid={!!errors.title_kz} />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px"}}>
          <Button label="Отменить" type="button" onClick={handleClose} autoFocus className="p-button-text" />
          <Button label="Сохранить" type="submit" loading={requestFetching} />
        </div>
      </form>
    </Modal>
  )
}

export default ContestBookAddUpdateModal
