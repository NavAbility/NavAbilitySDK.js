// TODO: Move all the file functionality to here as blob functionality.

export const QUERY_BLOBS = `
  query Blobs {
    blobs {
      id
      size
      name
    }
  }`;

export const MUTATION_CREATE_DOWNLOAD = `
  mutation app_create_download($blobId: ID!) {
    url: createDownload(blobId: $blobId)
  }
`;