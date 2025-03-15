import React, {FC, useEffect, useRef, useState} from "react"
import {FileUpload, FileUploadProps} from "primereact/fileupload"
import {Button} from "primereact/button"

type Props = FileUploadProps & {
  uploadedImage?: string
}

const FileInput: FC<Props> = ({uploadedImage, ...props}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(uploadedImage || null)
  const fileUploadRef = useRef<any>(null)

  useEffect(() => {
    if (uploadedImage) {
      setPreviewUrl(uploadedImage)
    }
  }, [uploadedImage])

  const handleSelect = (e: any) => {
    if (e.files && e.files.length > 0) {
      const file = e.files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }

    // Optionally forward the onSelect event if provided.
    if (props.onSelect) {
      props.onSelect(e)
    }
  }

  const handleRemove = () => {
    setPreviewUrl(null)
    // Clear the FileUpload component if it supports a clear method
    if (fileUploadRef.current && fileUploadRef.current.clear) {
      fileUploadRef.current.clear()
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FileUpload
        ref={fileUploadRef}
        chooseLabel="Обзор"
        mode="basic"
        maxFileSize={1000000}
        customUpload
        onSelect={handleSelect}
        {...props}
        style={{marginBottom: "1rem", width: "100%"}}
      />
      {previewUrl && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={previewUrl}
            alt="Uploaded preview"
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              objectFit: "contain",
            }}
          />
          <Button
            onClick={handleRemove}
            style={{width: "fit-content"}}
            size="small"
            outlined
            severity="warning"
            className="mt-2!"
          >
            Удалить изображение
          </Button>
        </div>
      )}
    </div>
  )
}

export default FileInput
