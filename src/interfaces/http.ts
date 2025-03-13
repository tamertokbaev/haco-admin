import {AxiosResponse} from "axios"

export interface IResponse<T> {
  message: string
  result: T
  status: boolean
  status_code: number
}

export interface ITableResponse<T> {
  items: T
  page: number
  size: number
  total: number
}

export type PromiseTableResponse<T> = PromiseResponse<ITableResponse<T>>
export type PromiseResponse<T> = Promise<AxiosResponse<IResponse<T>>>
