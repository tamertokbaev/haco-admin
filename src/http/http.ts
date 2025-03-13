import axios from "axios"
import qs from "qs"

const axiosInstance = axios.create({})

export default axiosInstance

export const paramsSerializerRepeat = (params: any) => qs.stringify(params, {arrayFormat: "repeat"})
