import http from "./http"
import {API_BASE_URL} from "../constants/constants"
import {PromiseResponse} from "../interfaces/http"
import {Hashtag, HashtagCreate, HashtagUpdate, Product, Story, StoryCreate, StoryUpdate} from "../interfaces/interfaces"

export namespace BackendService {
  export const getPosts = () => {
    return http.get(`${API_BASE_URL}/api/v1/post`, {params: {language: "ru"}})
  }

  export const getProductsList = (): PromiseResponse<Array<Product>> => {
    return http.get(`${API_BASE_URL}/api/v1/product`)
  }

  export const deleteProduct = (productId: number): PromiseResponse<unknown> => {
    return http.delete(`${API_BASE_URL}/api/v1/admin/product`, {params: {product_id: productId}})
  }

  export const getStoriesList = (): PromiseResponse<Array<Story>> => {
    return http.get(`${API_BASE_URL}/api/v1/stories/all`)
  }

  export const createStory = (story: StoryCreate): PromiseResponse<Story> => {
    return http.post(`${API_BASE_URL}/api/v1/stories/create`, story)
  }

  export const updateStory = (story: StoryUpdate): PromiseResponse<Story> => {
    return http.post(`${API_BASE_URL}/api/v1/stories`, story)
  }

  export const deleteStory = (storiesId: number): PromiseResponse<unknown> => {
    return http.delete(`${API_BASE_URL}/api/v1/stories/id`, {params: {stories_id: storiesId}})
  }

  export const getHashtagsList = (): PromiseResponse<Array<Hashtag>> => {
    return http.get(`${API_BASE_URL}/api/v1/hashtag`)
  }

  export const deleteHashtag = (hashtagId: number): PromiseResponse<unknown> => {
    return http.delete(`${API_BASE_URL}/api/v1/hashtag`, {params: {hashtag_id: hashtagId}})
  }

  export const createHashtag = (data: HashtagCreate): PromiseResponse<unknown> => {
    return http.post(`${API_BASE_URL}/api/v1/hashtag`, data)
  }

  export const updateHashtag = (data: HashtagUpdate): PromiseResponse<unknown> => {
    return http.put(`${API_BASE_URL}/api/v1/hashtag`, data)
  }
}
