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

export type ProductCreate = {
  contacts: string
  contacts_en: string
  contacts_kz: string
  count: number
  description: string
  description_en: string
  description_kz: string
  discount: string
  discount_en: string
  discount_kz: string
  logo: {
    file: string
    filename: string
  }
  offer: string
  offer_en: string
  offer_kz: string
  point: number
  product_type: string
  sapphire: number
  sell_type: string
  sku: string
  title: string
  title_en: string
  title_kz: string
}

export type ProductUpdate = ProductCreate & {
  product_id: number
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

export type HashtagAttach = {
  hashtag_id: number
  post_id: number
}

export interface CollectionCreate {
  image: {
    file: string
    filename: string
  }
  image_kz: {
    file: string
    filename: string
  }
  image_ru: {
    file: string
    filename: string
  }
  is_recommendation: boolean
  name: string
  name_kz: string
  name_ru: string
}

export type CollectionUpdate = CollectionCreate & {
  collection_id: number
}

export type CollectionAttach = {
  collection_id: number
  post_id: number
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
  posts: Post[]
}

export interface PostsGet {
  bestsellers: Post[]
  continue_reading: Post[]
  partners: Post[]
}

export interface Post {
  body: string
  code: string
  collections: Collection[]
  company: string
  created_at: string
  description: string
  hashtags: Hashtag[]
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

export interface PostCreate {
  body: string
  company: string
  description: string
  image: {
    file: string
    filename: string
  }
  language: string
  logo: {
    file: string
    filename: string
  }
  point: number
  quiz_time: number
  rating_status: string
  read_time: number
  sapphire: number
  short_description: string
  title: string
}

export type PostUpdate = PostCreate & {
  post_id: number
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

export interface Contest {
  code: string
  consolation_prize_sapphire: number
  contest_books: ContestBook[]
  contest_id: number
  contest_participants: ContestParticipant[]
  created_at: string
  end_time: string
  is_active: boolean
  start_time: string
  updated_at: string
}

export interface ContestPrizeCreate {
  contest_id: number
  image: {file: string; filename: string} | null
  number: number
  prize_name: string
}

export type ContestPrizeUpdate = ContestPrizeCreate & {
  contest_prize_id: number
}

export interface ContestCreate {
  consolation_prize_sapphire: number
  end_time: string
  is_active: boolean
  start_time: string
}

export type ContestUpdate = ContestCreate & {
  contest_id: number
}

export interface ContestBook {
  body: string
  body_en: string
  body_kz: string
  contest_book_id: number
  contest_coins: number
  contest_history: ContestHistory[]
  contest_id: number
  count_of_questions: number
  created_at: string
  day_number: number
  description: string
  description_en: string
  description_kz: string
  photo_path: string
  point: number
  status: string
  title: string
  title_en: string
  title_kz: string
  updated_at: string
}

export type ContestBookCreate = {
  body: string
  body_en: string
  body_kz: string
  contest_coins: number
  contest_id: number
  count_of_questions: number
  day_number: number
  description: string
  description_en: string
  description_kz: string
  image: {
    file: string
    filename: string
  }
  point: number
  status: string
  title: string
  title_en: string
  title_kz: string
}

export type ContestBookUpdate = ContestBookCreate & {
  contest_book_id: number
}

export interface ContestHistory {
  contest_book_id: number
  contest_history_id: number
  contest_id: number
  created_at: string
  points: number
  read_time: number
  updated_at: string
  user_id: string
}

export interface ContestParticipant {
  contest_id: number
  contest_participant_id: number
  contest_prize_id: number
  created_at: string
  number: number
  points: number
  prize_get: boolean
  read_time: number
  updated_at: string
  user: User
  user_id: string
}

export interface User {
  confirmation_send_at: string
  confirmation_token: string
  email: string
  email_confirmed_at: string
  encrypted_password: string
  id: string
  profile: Profile
}

export interface Profile {
  avatar_url: string
  email: string
  full_name: string
  id: string
  phone: string
  updated_at: string
  user_name: string
}
