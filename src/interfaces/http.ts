import { AxiosResponse } from "axios";

export interface IResponse<T> {
  message: string;
  result: T;
  status: boolean;
  status_code: number;
}

export type PromiseResponse<T> = Promise<AxiosResponse<IResponse<T>>>;
