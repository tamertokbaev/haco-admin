import React, {FC} from "react"
import {FileUpload, FileUploadProps} from "primereact/fileupload"

type Props = FileUploadProps & {}

const FileInput: FC<Props> = ({...props}) => {
  return <FileUpload chooseLabel="Обзор" mode="basic" maxFileSize={1000000} customUpload {...props} />
}

export default FileInput
