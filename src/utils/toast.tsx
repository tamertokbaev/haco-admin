import {Slide, toast} from "react-toastify"

const toastConfig = {
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  pauseOnFocusLoss: false,
  transition: Slide,
  closeButton: true,
  autoClose: 3000,
}

const displaySuccessMessage = (title: string) => {
  toast.success(title, {...toastConfig})
}

const displayErrorMessage = (title: string) => {
  toast.error(title, {...toastConfig})
}

export const Toast = {
  displaySuccessMessage,
  displayErrorMessage,
}
