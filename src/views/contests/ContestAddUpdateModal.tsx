import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {Contest, ContestCreate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import {yupResolver} from "@hookform/resolvers/yup"
import {ContestValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import {formatDateLocal} from "../../utils/date"
import Checkbox from "../../components/Checkbox/Checkbox"

type Props = {
  isOpen: boolean
  handleClose: () => void
  contest: Contest | null
  onSuccessModify: () => void
}

const ContestAddUpdateModal: FC<Props> = ({isOpen, handleClose, contest, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState: {errors},
    // @ts-ignore
  } = useForm<ContestCreate>({resolver: yupResolver(ContestValidationSchema), defaultValues: {...contest}})

  useEffect(() => {
    if (isOpen && contest) {
      reset({
        consolation_prize_sapphire: contest.consolation_prize_sapphire,
        start_time: formatDateLocal(contest.start_time),
        end_time: formatDateLocal(contest.end_time),
        is_active: contest.is_active,
      })
    }
  }, [isOpen, contest])

  const submitForm = (data: ContestCreate) => {
    setRequestFetching(true)
    const formData = {
      ...data,
      start_time: new Date(data.start_time).toISOString(),
      end_time: new Date(data.end_time).toISOString(),
    }
    let promiseToExecute = contest
      ? BackendService.updateContest({...formData, contest_id: contest.contest_id})
      : BackendService.createContest(formData)

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

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`${contest ? "Редактирование" : "Создание"} контеста`}>
      <form onSubmit={handleSubmit(submitForm)} style={{padding: "10px 0"}} className="flex flex-col gap-4">
        <FormGroup
          label="Сапфиры"
          helperText={errors.consolation_prize_sapphire?.message}
          invalid={!!errors.consolation_prize_sapphire}
        >
          <TextField
            placeholder="Сапфиры"
            {...register("consolation_prize_sapphire")}
            invalid={!!errors.consolation_prize_sapphire}
          />
        </FormGroup>
        <FormGroup label="Время начала" helperText={errors.start_time?.message} invalid={!!errors.start_time}>
          <TextField
            type="datetime-local"
            placeholder="Время начала"
            {...register("start_time")}
            invalid={!!errors.start_time}
          />
        </FormGroup>
        <FormGroup label="Время окончания" helperText={errors.end_time?.message} invalid={!!errors.end_time}>
          <TextField
            type="datetime-local"
            placeholder="Время окончания"
            {...register("end_time")}
            invalid={!!errors.end_time}
          />
        </FormGroup>
        <FormGroup helperText={errors.is_active?.message} invalid={!!errors.is_active}>
          <Checkbox control={control} name="is_active" label="Активный" invalid={!!errors.is_active} />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px"}}>
          <Button label="Отменить" type="button" onClick={handleClose} autoFocus className="p-button-text" />
          <Button label="Сохранить" type="submit" loading={requestFetching} />
        </div>
      </form>
    </Modal>
  )
}

export default ContestAddUpdateModal
