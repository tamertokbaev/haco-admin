import {useRef, useState} from "react"
import {Button} from "primereact/button"
import {confirmPopup, ConfirmPopup} from "primereact/confirmpopup"
import Table, {TableRef, TableRow} from "../../components/Table/Table"
import {Product} from "../../interfaces/interfaces"
import {BackendService} from "../../http/service"
import {Toast} from "../../utils/toast"
import Layout from "../../components/Layout/Layout"
import {AppRoutePageNames, AppRoutes} from "../../routes"
import ProductAddUpdateModal from "../../views/products/ProductAddUpdateModal"

const ProductsListPage = () => {
  const tableRef = useRef<TableRef>(null)
  const [productEditState, setProductEditState] = useState<{isOpen: boolean; product: Product | null}>({
    isOpen: false,
    product: null,
  })

  const closeModal = () => {
    setProductEditState((prevState) => ({...prevState, isOpen: false}))
  }

  const rows: Array<TableRow<Product>> = [
    {heading: "ID", content: (item) => item.product_id},
    {heading: "Название", content: (item) => item.title},
    {heading: "Тип продукта", content: (item) => item.product_type},
    {
      heading: "",
      content: (item) => (
        <Button size="small" onClick={() => setProductEditState({isOpen: true, product: item})}>
          Редактировать
        </Button>
      ),
    },
    {
      heading: "",
      content: (item) => (
        <Button size="small" severity="danger" onClick={(event) => confirmDelete(event, () => deleteItem(item))}>
          Удалить
        </Button>
      ),
    },
  ]

  const confirmDelete = (event: any, onAccept: () => void) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Вы действительно хотите удалить эту запись?",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      acceptLabel: "Да",
      rejectLabel: "Нет",
      closeOnEscape: true,
      accept: onAccept,
    })
  }

  const deleteItem = (product: Product) => {
    BackendService.deleteProduct(product.product_id)
      .then((res) => {
        if (res.data.status) {
          Toast.displaySuccessMessage("Запись успешно удалена!")
          handleForceRefetch()
        } else Toast.displayErrorMessage(res.data.message)
      })
      .catch(() => {
        Toast.displayErrorMessage("Произошла ошибка при удалении записи!")
      })
  }

  const handleForceRefetch = () => {
    tableRef.current?.forcedRefetchData()
  }

  return (
    <Layout pageTitle={AppRoutePageNames[AppRoutes.products]}>
      <ConfirmPopup />
      <div style={{marginBottom: "1rem", display: "flex", justifyContent: "flex-end"}}>
        <Button size="small" icon="pi pi-plus" onClick={() => setProductEditState({isOpen: true, product: null})}>
          Добавить новую запись
        </Button>
      </div>
      <Table ref={tableRef} rows={rows} fetchUrl={BackendService.getProductsList} />
      <ProductAddUpdateModal
        isOpen={productEditState.isOpen}
        handleClose={closeModal}
        product={productEditState.product}
        onSuccessModify={handleForceRefetch}
      />
    </Layout>
  )
}

export default ProductsListPage
