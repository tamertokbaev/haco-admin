import http from "./http"
import {API_BASE_URL} from "../constants/constants"
import {PromiseResponse, PromiseTableResponse} from "../interfaces/http"
import {
  Collection,
  CollectionAttach,
  CollectionCreate,
  CollectionUpdate,
  Contest,
  ContestCreate,
  ContestPrizeCreate,
  ContestPrizeUpdate,
  ContestUpdate,
  Hashtag,
  HashtagAttach,
  HashtagCreate,
  HashtagUpdate,
  Post,
  PostCreate,
  PostsGet,
  PostUpdate,
  Product,
  ProductCreate,
  ProductUpdate,
  Story,
  StoryCreate,
  StoryUpdate,
} from "../interfaces/interfaces"

export namespace BackendService {
  export const getPosts = (): PromiseResponse<PostsGet> => {
    return http.get(`${API_BASE_URL}/api/v1/post`, {params: {language: "ru"}})
  }

  export const getPostsV2 = (size: number = 10, page: number = 1): PromiseTableResponse<Array<Post>> => {
    return http.get(`${API_BASE_URL}/api/v2/post/filter`, {
      params: {language: "ru", size, page, post_type: "all"},
    })
  }

  export const createPost = (data: PostCreate): PromiseResponse<unknown> => {
    return http.post(`${API_BASE_URL}/api/v1/admin/post`, data)
  }

  export const updatePost = (data: PostUpdate): PromiseResponse<unknown> => {
    return http.post(`${API_BASE_URL}/api/v1/admin/post`, data)
  }

  export const deletePost = (postId: number): PromiseResponse<unknown> => {
    return http.delete(`${API_BASE_URL}/api/v1/admin/post`, {params: {post_id: postId}})
  }

  export const getProductsList = (): PromiseResponse<Array<Product>> => {
    return http.get(`${API_BASE_URL}/api/v1/product`)
  }

  export const deleteProduct = (productId: number): PromiseResponse<unknown> => {
    return http.delete(`${API_BASE_URL}/api/v1/admin/product`, {params: {product_id: productId}})
  }

  export const createProduct = (data: ProductCreate): PromiseResponse<unknown> => {
    return http.post(`${API_BASE_URL}/api/v1/admin/product`, data)
  }

  export const updateProduct = (data: ProductUpdate): PromiseResponse<unknown> => {
    return http.put(`${API_BASE_URL}/api/v1/admin/product`, data)
  }

  export const getStoriesList = (): PromiseResponse<Array<Story>> => {
    return http.get(`${API_BASE_URL}/api/v1/stories/all`)
  }

  export const createStory = (story: StoryCreate): PromiseResponse<Story> => {
    return http.post(`${API_BASE_URL}/api/v1/stories/create`, story)
  }

  export const updateStory = (story: StoryUpdate): PromiseResponse<Story> => {
    return http.put(`${API_BASE_URL}/api/v1/stories`, story)
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

  export const attachHashtagToPost = (data: HashtagAttach) => {
    return http.post(`${API_BASE_URL}/api/v1/hashtag/add`, data)
  }

  export const deleteHashtagFromPost = (data: HashtagAttach) => {
    return http.delete(`${API_BASE_URL}/api/v1/hashtag/delete-post`, {data})
  }

  export const getCollectionsList = (): PromiseResponse<Array<Collection>> => {
    return http.get(`${API_BASE_URL}/api/v1/collection`)
  }

  export const deleteCollection = (collectionId: number): PromiseResponse<unknown> => {
    return http.delete(`${API_BASE_URL}/api/v1/collection`, {params: {collection_id: collectionId}})
  }

  export const createCollection = (data: CollectionCreate): PromiseResponse<unknown> => {
    return http.post(`${API_BASE_URL}/api/v1/collection`, data)
  }

  export const updateCollection = (data: CollectionUpdate): PromiseResponse<unknown> => {
    return http.put(`${API_BASE_URL}/api/v1/collection`, data)
  }

  export const attachCollectionToPost = (data: CollectionAttach) => {
    return http.post(`${API_BASE_URL}/api/v1/collection/add`, data)
  }

  export const deleteCollectionFromPost = (data: CollectionAttach) => {
    return http.delete(`${API_BASE_URL}/api/v1/collection/delete-post`, {data})
  }

  export const getContestList = (): PromiseResponse<Array<Contest>> => {
    return http.get(`${API_BASE_URL}/api/v1/contest/all`)
  }

  export const deleteContest = (contestId: number): PromiseResponse<unknown> => {
    return http.delete(`${API_BASE_URL}/api/v1/contest`, {params: {contest_id: contestId}})
  }

  export const createContest = (data: ContestCreate): PromiseResponse<unknown> => {
    return http.post(`${API_BASE_URL}/api/v1/contest`, data)
  }

  export const updateContest = (data: ContestUpdate): PromiseResponse<unknown> => {
    return http.put(`${API_BASE_URL}/api/v1/contest`, data)
  }

  export const createContestPrize = (data: ContestPrizeCreate): PromiseResponse<unknown> => {
    return http.post(`${API_BASE_URL}/api/v1/contest/prize`, data)
  }

  export const updateContestPrize = (data: ContestPrizeUpdate): PromiseResponse<unknown> => {
    return http.put(`${API_BASE_URL}/api/v1/contest/prize`, data)
  }

  export const deleteContestPrize = (contestPrizeId: number): PromiseResponse<unknown> => {
    return http.delete(`${API_BASE_URL}/api/v1/contest/prize`, {params: {contest_prize_id: contestPrizeId}})
  }
}
