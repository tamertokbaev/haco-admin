export const convertFileIntoBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let result: string | null = ""
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      result = reader.result && reader.result.toString().replace("data", "").replace(/^.+,/, "")
      resolve(result || "")
    }
  })
}
