export type BlobInput = {
  name: string;
  size: number;
};

// TODO: Deprecate
export type Blob = {
  id: string;
  name: string;
  size: number;
};

export type BlobEntry = {
  id?: string,
  blobId?: string,
  originId: string,
  label: string,
  description: string,
  hash: string,
  mimeType: string,
  blobstore: string,
  origin: string,
  metadata: string
  timestamp: string
  nstime: string
  _type: string,
  _version: string,
  createdTimestamp?: string,
  lastUpdatedTimestamp?: string
}

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
