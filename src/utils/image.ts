import {IMAGE_BASE_URL} from "../constants/constants"

export const getImagePath = (path: string | undefined) => (path ? `${IMAGE_BASE_URL}/${path}` : undefined)
