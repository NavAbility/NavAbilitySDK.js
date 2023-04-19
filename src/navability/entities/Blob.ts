export type BlobInput = {
  name: string;
  size: number;
};

export type Blob = {
  id: string;
  name: string;
  size: number;
};

export type CompletedUploadPartInput = {
  partNumber: number;
  eTag: string;
};

export type CompletedUploadInput = {
  uploadId: string;
  parts: CompletedUploadPartInput[];
};

export type UploadPart = {
  partNumber: number;
  url: string;
};

export type UploadInfo = {
  uploadId: string;
  parts: UploadPart[];
  blob: Blob;
  expiration?: string;
};
