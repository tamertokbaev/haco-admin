import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {ContestPrizeCreate, ContestPrizeUpdate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import {yupResolver} from "@hookform/resolvers/yup"
import {ContestPrizeValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import FileInput from "../../components/FileInput/FileInput"
import {FileUploadHandlerEvent} from "primereact/fileupload"
import {convertFileIntoBase64} from "../../utils/file"

type Props = {
  isOpen: boolean
  handleClose: () => void
  contestPrize: ContestPrizeUpdate | null
  contestId: number
  onSuccessModify: () => void
}

const ContestPrizeAddUpdateModal: FC<Props> = ({isOpen, handleClose, contestPrize, contestId, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: {errors},
  } = useForm<ContestPrizeCreate>({
    // @ts-ignore
    resolver: yupResolver(ContestPrizeValidationSchema),
    defaultValues: {...contestPrize},
  })

  useEffect(() => {
    if (isOpen && contestPrize) {
      reset({
        number: contestPrize.number,
        prize_name: contestPrize.prize_name,
        image: null,
      })
    } else {
      reset({number: 0, prize_name: ""})
    }
  }, [isOpen, contestPrize])

  const submitForm = (data: ContestPrizeCreate) => {
    setRequestFetching(true)
    const formData = {
      ...data,
    }
    let promiseToExecute = contestPrize
      ? BackendService.updateContestPrize({
          ...formData,
          contest_prize_id: contestPrize.contest_prize_id,
          contest_id: contestId,
        })
      : BackendService.createContestPrize({...formData, contest_id: contestId})

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
    <Modal isOpen={isOpen} handleClose={handleClose} title={`${contestPrize ? "Редактирование" : "Создание"} контеста`}>
      <form onSubmit={handleSubmit(submitForm)} style={{padding: "10px 0"}} className="flex flex-col gap-4">
        <FormGroup label="Название приза" helperText={errors.prize_name?.message} invalid={!!errors.prize_name}>
          <TextField placeholder="Название приза" {...register("prize_name")} invalid={!!errors.prize_name} />
        </FormGroup>
        <FormGroup label="Количество" helperText={errors.number?.message} invalid={!!errors.number}>
          <TextField placeholder="Количество" {...register("number")} invalid={!!errors.number} />
        </FormGroup>
        <FormGroup label="Иконка" helperText={errors.image?.message} invalid={!!errors.image}>
          <FileInput multiple={false} accept="image/*" uploadHandler={(e) => onUploadIcon(e)} />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px"}}>
          <Button label="Отменить" type="button" onClick={handleClose} autoFocus className="p-button-text" />
          <Button label="Сохранить" type="submit" loading={requestFetching} />
        </div>
      </form>
    </Modal>
  )
}

export default ContestPrizeAddUpdateModal
