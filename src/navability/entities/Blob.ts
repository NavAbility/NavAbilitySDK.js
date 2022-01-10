export type FileInput = {
    filename: string
    filesize: number
}

export type File = {
    id: string
    filename: string
    filesize: number
}
  
export type CompletedUploadPartInput = {
    partNumber: number
    eTag: string
}
  
export type CompletedUploadInput = {
    uploadId: string
    parts: CompletedUploadPartInput[]
}
  
export type UploadPart = {
    partNumber: number
    url: string
}
  
export type UploadInfo = {
    uploadId: string
    parts: UploadPart[]
    file: File
    expiration?: string
}