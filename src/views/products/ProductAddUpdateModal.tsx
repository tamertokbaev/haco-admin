import {FC} from "react"
import Modal from "../../components/Modal/Modal"
import {Product} from "../../interfaces/interfaces"

type Props = {
  isOpen: boolean
  handleClose: () => void
  product: Product | null
}

const ProductAddUpdateModal: FC<Props> = ({isOpen, handleClose, product}) => {
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title={`${product ? "Редактирование" : "Создание"} продукта`}>
      123
    </Modal>
  )
}

export default ProductAddUpdateModal
