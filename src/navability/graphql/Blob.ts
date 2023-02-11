//TODO: Move all the file functionality to here as blob functionality.

export const QUERY_BLOBS = `
  query Files {
    files {
      id
      filesize
      filename
    }
  }`;