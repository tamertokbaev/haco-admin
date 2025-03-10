import * as yup from "yup"

const fieldIsRequiredString = "Данное поле обязательно для заполнения"

export const IconValidation = yup.object().shape({
  file: yup.string().required(fieldIsRequiredString),
  filename: yup.string().required(fieldIsRequiredString),
})

export const StoryValidationSchema = yup.object().shape({
  end_time: yup.string().required(fieldIsRequiredString),
  start_time: yup.string().required(fieldIsRequiredString),
  title: yup.string().required(fieldIsRequiredString),
  icon: IconValidation,
})

export const HashtagValidationSchema = yup.object().shape({
  image_base64: yup.string().required(fieldIsRequiredString),
  name: yup.string().required(fieldIsRequiredString),
  name_kz: yup.string().required(fieldIsRequiredString),
  name_ru: yup.string().required(fieldIsRequiredString),
  is_visible: yup.boolean().required(fieldIsRequiredString),
})
