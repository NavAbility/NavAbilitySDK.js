export const QUERY_CALIBRATION = `
  query Calibration($fileId: ID!) {
    calibration(fileId: $fileId) {
      placeholder
    }
  }`;

export const MUTATION_ADDVARIABLE = `
  mutation addVariable ($variable: FactorGraphInput!) {
    addVariable(variable: $variable)
  }`;

export const MUTATION_ADDFACTOR = `
  mutation addFactor ($factor: FactorGraphInput!) {
    addFactor(factor: $factor)
  }`;

export const MUTATION_SOLVESESSION = `
  mutation solveSession ($client: ClientInput!) {
    solveSession(client: $client)
  }`;

export const MUTATION_SOLVEFEDERATED = `
  mutation solveFederated ($scope: ScopeInput!) {
    solveFederated(scope: $scope)
  }`;

export const MUTATION_DEMOCANONICALHEXAGONAL = `
  mutation demoCanonicalHexagonal ($client: ClientInput!) {
    demoCanonicalHexagonal(client: $client)
  }`;

export const MUTATION_CREATE_UPLOAD = `
  mutation CreateUpload ($blob: BlobInput!, $parts: Int) {
    createUpload(blob: $blob, parts: $parts) {
      uploadId
      blob {
        id
        name
        size
      }
      parts {
        partNumber
        url
      }
    }
  }`;

export const MUTATION_ABORT_UPLOAD = `
  mutation AbortUpload ($blobId: ID!, $uploadId: ID!) {
    abortUpload(blobId: $blobId, uploadId: $uploadId)
  }`;

export const MUTATION_COMPLETE_UPLOAD = `
  mutation CompleteUpload ($blobId: ID!, $completedUpload: CompletedUploadInput!) {
    completeUpload(blobId: $blobId, completedUpload: $completedUpload)
  }`;

export const MUTATION_PROC_CALIBRATION = `
  mutation ProcessCalibration ($blobId: ID!) {
    procCalibration(blobId: $blobId)
  }`;

export const SUBSCRIPTION_UPDATES = `
  subscription TrackEvents($client: ClientInput!) {
    mutationUpdate(client: $client) {
      requestId,
      action,
      state,
      timestamp
    }
  }`;
