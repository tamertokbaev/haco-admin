import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react"
import {PromiseResponse} from "../../interfaces/http"
import {DataTable, DataTableSelectionMultipleChangeEvent} from "primereact/datatable"
import {Column} from "primereact/column"

export type TableRow<T> = {
  heading: string
  content: (item: T) => React.ReactNode | React.ReactElement
}

export type TableProps<T> = {
  rows: Array<TableRow<T>>
  fetchUrl: () => PromiseResponse<Array<T>>
  hasSelection?: boolean
  onItemsSelected?: (selectedItems: T[]) => void
}

export type TableRef = {
  forcedRefetchData: () => void
}

const TableComponent = <T extends object>(
  {rows, fetchUrl, hasSelection = false, onItemsSelected}: TableProps<T>,
  ref: React.Ref<TableRef>,
) => {
  const [data, setData] = useState<Array<T>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const fetchData = async () => {
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

  useEffect(() => {
    fetchData()
  }, [])

  useImperativeHandle(ref, () => ({
    forcedRefetchData: fetchData,
  }))

  const handleSelectionChange = (e: DataTableSelectionMultipleChangeEvent<Array<T>>) => {
    const selected = e.value
    setSelectedItems(selected)
    if (onItemsSelected) {
      onItemsSelected(selected)
    }
  }

  return (
    <DataTable
      value={data}
      stripedRows
      scrollable
      loading={loading}
      selection={selectedItems}
      onSelectionChange={handleSelectionChange}
      selectionMode={hasSelection ? "checkbox" : null}
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
