import * as yup from "yup"

const fieldIsRequiredString = "Данное поле обязательно для заполнения"

export const IconValidation = yup.object().shape({
  file: yup.string(),
  filename: yup.string(),
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

export const CollectionValidationSchema = yup.object().shape({
  image: IconValidation,
  image_kz: IconValidation,
  image_ru: IconValidation,
  is_recommendation: yup.boolean().required(fieldIsRequiredString),
  name: yup.string().required(fieldIsRequiredString),
  name_kz: yup.string().required(fieldIsRequiredString),
  name_ru: yup.string().required(fieldIsRequiredString),
})

export const ProductValidationSchema = yup.object().shape({
  contacts: yup.string().required(fieldIsRequiredString),
  contacts_en: yup.string(),
  contacts_kz: yup.string(),
  count: yup.number(),
  description: yup.string().required(fieldIsRequiredString),
  description_en: yup.string(),
  description_kz: yup.string(),
  discount: yup.string(),
  discount_en: yup.string(),
  discount_kz: yup.string(),
  logo: IconValidation,
  offer: yup.string(),
  offer_kz: yup.string(),
  offer_en: yup.string(),
  point: yup.number(),
  product_type: yup.string(),
  sapphire: yup.number(),
  sell_type: yup.string(),
  sku: yup.string().required(fieldIsRequiredString),
  title: yup.string().required(fieldIsRequiredString),
  title_en: yup.string(),
  title_kz: yup.string(),
})

export const PostValidationSchema = yup.object().shape({
  title: yup.string().required(fieldIsRequiredString),
  short_description: yup.string(),
  body: yup.string(),
  company: yup.string(),
  image: IconValidation,
  logo: IconValidation,
  language: yup.string(),
  point: yup.number(),
  quiz_time: yup.number(),
  read_time: yup.number(),
  rating_status: yup.string(),
  sapphire: yup.number(),
})

export const ContestValidationSchema = yup.object().shape({
  consolation_prize_sapphire: yup.number().required(fieldIsRequiredString),
  end_time: yup.string().required(fieldIsRequiredString),
  start_time: yup.string().required(fieldIsRequiredString),
  is_active: yup.boolean(),
})
