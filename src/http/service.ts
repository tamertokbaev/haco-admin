import http from "./http"
import {API_BASE_URL} from "../constants/constants"
import {PromiseResponse} from "../interfaces/http"
import {Product, Story, StoryCreate, StoryUpdate} from "../interfaces/interfaces"

export namespace BackendService {
  export const getPosts = () => {
    return http.get(`${API_BASE_URL}`)
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
}
