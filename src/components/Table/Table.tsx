import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react"
import {PromiseResponse, PromiseTableResponse} from "../../interfaces/http"
import {DataTable, DataTableSelectionMultipleChangeEvent, DataTableStateEvent} from "primereact/datatable"
import {Column} from "primereact/column"

export type TableRow<T> = {
  heading: string
  content: (item: T) => React.ReactNode | React.ReactElement
}

export type TableProps<T> = {
  rows: Array<TableRow<T>>
  fetchUrl?: () => PromiseResponse<Array<T>>
  fetchUrlPaginated?: (size?: number, page?: number) => PromiseTableResponse<Array<T>>
  hasSelection?: boolean
  selectionItems?: T[]
  onItemsSelected?: (selectedItems: T[]) => void
  onItemSelect?: (item: T) => void
  customData?: Array<T>
}

export type TableRef = {
  forcedRefetchData: () => void
  forcedRefetchDataTable: () => void
}

const TableComponent = <T extends object>(
  {
    rows,
    fetchUrl,
    fetchUrlPaginated,
    hasSelection = false,
    selectionItems,
    onItemsSelected,
    onItemSelect,
    customData,
  }: TableProps<T>,
  ref: React.Ref<TableRef>,
) => {
  const [data, setData] = useState<Array<T>>(customData || [])
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedItems, setSelectedItems] = useState<T[]>(selectionItems || [])
  const [page, setPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)

  const fetchData = async () => {
    if (!fetchUrl) return
    setLoading(true)
    try {
      const result = await fetchUrl()
      if (result.data.status) {
        setData(result.data.result)
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchDataTable = async (page: number, size: number) => {
    if (!fetchUrlPaginated) return
    setLoading(true)
    try {
      const result = await fetchUrlPaginated(size, page)
      if (result.data.status) {
        setData(result.data.result.items)
        setPage(result.data.result.page)
        setTotalItems(result.data.result.total)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (customData) {
      setData(customData)
    }
  }, [customData])

  useEffect(() => {
    if (selectionItems) {
      setSelectedItems(selectionItems)
    }
  }, [selectionItems])

  useEffect(() => {
    fetchData()
    fetchDataTable(1, 10)
  }, [])

  useEffect(() => {
    fetchDataTable(page, itemsPerPage)
  }, [page, itemsPerPage])

  useImperativeHandle(ref, () => ({
    forcedRefetchData: fetchData,
    forcedRefetchDataTable: () => fetchDataTable(page, itemsPerPage),
  }))

  const handleSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Array<T>>) => {
    const selected = e.value
    if (onItemSelect) {
      onItemSelect(selected[selected.length - 1])
    }
    setSelectedItems(selected)
    if (onItemsSelected) {
      onItemsSelected(selected)
    }
  }

  const handlePageChange = (e: DataTableStateEvent) => {
    fetchDataTable((e.page || 0) + 1, e.rows)
    if (e.rows !== itemsPerPage) setItemsPerPage(e.rows)
  }

  return (
    <DataTable
      disabled={loading}
      value={data}
      stripedRows
      scrollable
      selection={selectedItems}
      onSelectionChange={handleSelectionChange}
      paginator={fetchUrlPaginated !== undefined}
      selectionMode={hasSelection ? "checkbox" : null}
      rows={itemsPerPage}
      rowsPerPageOptions={[10, 25, 50]}
      totalRecords={totalItems}
      lazy
      first={(page - 1) * itemsPerPage}
      onPage={handlePageChange}
      emptyMessage="Не найдено записей"
    >
      {hasSelection && <Column selectionMode="multiple" headerStyle={{width: "3rem"}} />}
      {rows.map((col) => (
        <Column key={col.heading} body={col.content} header={col.heading} />
      ))}
    </DataTable>
  )
}

export default forwardRef(TableComponent) as <T>(
  props: TableProps<T> & {ref?: React.Ref<TableRef>},
) => React.ReactElement
