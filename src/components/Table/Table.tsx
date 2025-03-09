import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react"
import {PromiseResponse} from "../../interfaces/http"
import {DataTable} from "primereact/datatable"
import {Column} from "primereact/column"

export type TableRow<T> = {
  heading: string
  content: (item: T) => React.ReactNode | React.ReactElement
}

export type TableProps<T> = {
  rows: Array<TableRow<T>>
  fetchUrl: () => PromiseResponse<Array<T>>
}

export type TableRef = {
  forcedRefetchData: () => void
}

const TableComponent = <T extends object>({rows, fetchUrl}: TableProps<T>, ref: React.Ref<TableRef>) => {
  const [data, setData] = useState<Array<T>>([])
  const [loading, setLoading] = useState<boolean>(false)

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

  return (
    <DataTable value={data} size="large" stripedRows scrollable loading={loading}>
      {rows.map((col) => (
        <Column key={col.heading} body={col.content} header={col.heading} />
      ))}
    </DataTable>
  )
}

export default forwardRef(TableComponent) as <T>(
  props: TableProps<T> & {ref?: React.Ref<TableRef>},
) => React.ReactElement
