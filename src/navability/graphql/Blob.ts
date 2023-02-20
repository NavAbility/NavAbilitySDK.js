//TODO: Move all the file functionality to here as blob functionality.

export const QUERY_BLOBS = `
  query Files {
    files {
      id
      filesize
      filename
    }
  }`;

export const MUTATION_CREATE_DOWNLOAD = `
  mutation app_create_download($fileId: ID!) {
    url: createDownload(fileId: $fileId)
  }
`;