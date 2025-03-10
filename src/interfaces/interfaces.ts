export interface Product {
  airtable_product_id: string
  contacts: string
  contacts_en: string
  contacts_kz: string
  count: number
  created_at: string
  description: string
  description_en: string
  description_kz: string
  discount: string
  discount_en: string
  discount_kz: string
  images: Image[]
  offer: string
  offer_en: string
  offer_kz: string
  point: number
  product_id: number
  product_tags: ProductTag[]
  product_type: string
  sapphire: number
  sell_type: string
  sku: string
  status: string
  title: string
  title_en: string
  title_kz: string
}

export interface Image {
  created_at: string
  file_name: string
  image_id: number
  post_id: number
  product_id: number
  type: string
  url: string
}

export interface ProductTag {
  image_path: string
  name: string
  name_kz: string
  name_ru: string
  product_tag_id: number
}

export interface Story {
  created_at: string
  end_time: string
  icon_path: string
  start_time: string
  stories_id: number
  story_pages: StoryPage[]
  title: string
}

export interface StoryPage {
  created_at: string
  image_path: string
  is_readed: boolean
  page_order: number
  stories_id: number
  story_page_id: number
  text: string
  uuid: string
}

export interface StoryCreate {
  end_time: string
  icon: Icon
  start_time: string
  title: string
}

export type StoryUpdate = StoryCreate & {
  stories_id: number
}

export interface Icon {
  file: string
  filename: string
}

export interface Hashtag {
  hashtag_id: number
  image_path: string
  is_visible: boolean
  name: string
  name_kz: string
  name_ru: string
  posts: Post[]
}

export interface HashtagCreate {
  image_base64: string
  is_visible: boolean
  name: string
  name_kz: string
  name_ru: string
}

export type HashtagUpdate = HashtagCreate & {
  hashtag_id: number
}

export interface Post {
  body: string
  code: string
  collections: Collection[]
  company: string
  created_at: string
  description: string
  hashtags: string[]
  images: Image[]
  language: string
  point: number
  post_id: number
  post_order: number
  quiz_time: number
  rating_status: string
  read_time: number
  sapphire: number
  short_description: string
  status: string
  title: string
  uuid: string
}

export interface Collection {
  collection_id: number
  image_path: string
  image_path_kz: string
  image_path_ru: string
  is_recommendation: boolean
  name: string
  name_kz: string
  name_ru: string
  posts: string[]
}

export interface Image {
  created_at: string
  file_name: string
  image_id: number
  post_id: number
  product_id: number
  type: string
  url: string
}
