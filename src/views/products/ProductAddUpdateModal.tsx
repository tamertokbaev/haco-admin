import React, {FC, useEffect, useState} from "react"
import Modal from "../../components/Modal/Modal"
import {Product, ProductCreate} from "../../interfaces/interfaces"
import {useForm} from "react-hook-form"
import FormGroup from "../../components/FormGroup/FormGroup"
import TextField from "../../components/TextField/TextField"
import {Button} from "primereact/button"
import FileInput from "../../components/FileInput/FileInput"
import {FileUploadHandlerEvent} from "primereact/fileupload"
import {convertFileIntoBase64} from "../../utils/file"
import {yupResolver} from "@hookform/resolvers/yup"
import {ProductValidationSchema} from "../../validation/storyValidation"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"

type Props = {
  isOpen: boolean
  handleClose: () => void
  product: Product | null
  onSuccessModify: () => void
}

const ProductAddUpdateModal: FC<Props> = ({isOpen, handleClose, product, onSuccessModify}) => {
  const [requestFetching, setRequestFetching] = useState(false)
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    control,
    formState: {errors},
    // @ts-ignore
  } = useForm<ProductCreate>({resolver: yupResolver(ProductValidationSchema), defaultValues: {...product}})

  useEffect(() => {
    if (isOpen && product) {
      reset({...product})
    } else {
      reset({})
    }
  }, [isOpen, product])

  const submitForm = (data: ProductCreate) => {
    setRequestFetching(true)
    const formData = {
      ...data,
    }
    let promiseToExecute = product
      ? BackendService.updateProduct({...formData, product_id: product.product_id})
      : BackendService.createProduct(formData)

    promiseToExecute
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage(`Запись успешно ${product ? "отредактирована" : "создана"}!`)
          onSuccessModify()
        } else Toast.displayErrorMessage(`Произошла ошибка при ${product ? "редактировании" : "создании"} записи!`)
      })
      .catch(() => {
        Toast.displayErrorMessage(`Произошла ошибка при ${product ? "редактировании" : "создании"} записи!`)
      })
      .finally(() => {
        setRequestFetching(false)
      })
  }

  const onUploadIcon = async (event: FileUploadHandlerEvent) => {
    const file = event.files[0]
    const base64 = await convertFileIntoBase64(file)
    setValue("logo", {file: base64, filename: file.name})
  }

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`${product ? "Редактирование" : "Создание"} продукта`}>
      <form onSubmit={handleSubmit(submitForm)} style={{padding: "10px 0"}} className="flex flex-col gap-4">
        <FormGroup label="Заголовок" helperText={errors.title?.message} invalid={!!errors.title}>
          <TextField placeholder="Заголовок" {...register("title")} invalid={!!errors.title} />
        </FormGroup>
        <FormGroup label="Заголовок KZ" helperText={errors.title_kz?.message} invalid={!!errors.title_kz}>
          <TextField placeholder="Заголовок KZ" {...register("title_kz")} invalid={!!errors.title_kz} />
        </FormGroup>
        <FormGroup label="Заголовок EN" helperText={errors.title_en?.message} invalid={!!errors.title_en}>
          <TextField placeholder="Заголовок EN" {...register("title_en")} invalid={!!errors.title_en} />
        </FormGroup>
        <FormGroup label="SKU" helperText={errors.sku?.message} invalid={!!errors.sku}>
          <TextField placeholder="SKU" {...register("sku")} invalid={!!errors.sku} />
        </FormGroup>
        <FormGroup label="Тип продажи" helperText={errors.sell_type?.message} invalid={!!errors.sell_type}>
          <TextField placeholder="Тип продажи" {...register("sell_type")} invalid={!!errors.sell_type} />
        </FormGroup>
        <FormGroup label="Сапфиры" helperText={errors.sapphire?.message} invalid={!!errors.sapphire}>
          <TextField placeholder="Сапфиры" {...register("sapphire")} invalid={!!errors.sapphire} />
        </FormGroup>
        <FormGroup label="Кол-во очков" helperText={errors.point?.message} invalid={!!errors.point}>
          <TextField placeholder="Кол-во очков" {...register("point")} invalid={!!errors.point} />
        </FormGroup>
        <FormGroup label="Тип продукта" helperText={errors.product_type?.message} invalid={!!errors.product_type}>
          <TextField placeholder="Тип продукта" {...register("product_type")} invalid={!!errors.product_type} />
        </FormGroup>
        <FormGroup label="Предложение" helperText={errors.offer?.message} invalid={!!errors.offer}>
          <TextField placeholder="Предложение" {...register("offer")} invalid={!!errors.offer} />
        </FormGroup>
        <FormGroup label="Предложение KZ" helperText={errors.offer_kz?.message} invalid={!!errors.offer_kz}>
          <TextField placeholder="Предложение KZ" {...register("offer_kz")} invalid={!!errors.offer_kz} />
        </FormGroup>
        <FormGroup label="Предложение EN" helperText={errors.offer_en?.message} invalid={!!errors.offer_en}>
          <TextField placeholder="Предложение EN" {...register("offer_en")} invalid={!!errors.offer_en} />
        </FormGroup>
        <FormGroup label="Иконка" helperText={errors.logo?.message} invalid={!!errors.logo}>
          <FileInput multiple={false} accept="image/*" uploadHandler={(e) => onUploadIcon(e)} />
        </FormGroup>
        <FormGroup label="Спец предложение" helperText={errors.discount?.message} invalid={!!errors.discount}>
          <TextField placeholder="Спец предложение" {...register("discount")} invalid={!!errors.discount} />
        </FormGroup>
        <FormGroup label="Спец предложение KZ" helperText={errors.discount_kz?.message} invalid={!!errors.discount_kz}>
          <TextField placeholder="Спец предложение KZ" {...register("discount_kz")} invalid={!!errors.discount_kz} />
        </FormGroup>
        <FormGroup label="Спец предложение EN" helperText={errors.discount_en?.message} invalid={!!errors.discount_en}>
          <TextField placeholder="Спец предложение EN" {...register("discount_en")} invalid={!!errors.discount_en} />
        </FormGroup>
        <FormGroup label="Описание" helperText={errors.description?.message} invalid={!!errors.description}>
          <TextField placeholder="Описание" {...register("description")} invalid={!!errors.description} />
        </FormGroup>
        <FormGroup label="Описание KZ" helperText={errors.description_kz?.message} invalid={!!errors.description_kz}>
          <TextField placeholder="Описание KZ" {...register("description_kz")} invalid={!!errors.description_kz} />
        </FormGroup>
        <FormGroup label="Описание EN" helperText={errors.description_en?.message} invalid={!!errors.description_en}>
          <TextField placeholder="Описание EN" {...register("description_en")} invalid={!!errors.description_en} />
        </FormGroup>
        <FormGroup label="Кол-во" helperText={errors.count?.message} invalid={!!errors.count}>
          <TextField placeholder="Кол-во" {...register("count")} invalid={!!errors.count} />
        </FormGroup>
        <FormGroup label="Контакты" helperText={errors.contacts?.message} invalid={!!errors.contacts}>
          <TextField placeholder="Контакты" {...register("contacts")} invalid={!!errors.contacts} />
        </FormGroup>
        <FormGroup label="Контакты KZ" helperText={errors.contacts_kz?.message} invalid={!!errors.contacts_kz}>
          <TextField placeholder="Контакты KZ" {...register("contacts_kz")} invalid={!!errors.contacts_kz} />
        </FormGroup>
        <FormGroup label="Контакты EN" helperText={errors.contacts_en?.message} invalid={!!errors.contacts_en}>
          <TextField placeholder="Контакты EN" {...register("contacts_en")} invalid={!!errors.contacts_en} />
        </FormGroup>
        <div style={{display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "12px"}}>
          <Button label="Отменить" type="button" onClick={handleClose} autoFocus className="p-button-text" />
          <Button label="Сохранить" type="submit" loading={requestFetching} />
        </div>
      </form>
    </Modal>
  )
}

export default ProductAddUpdateModal
