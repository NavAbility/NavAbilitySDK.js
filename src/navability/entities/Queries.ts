export const QUERY_VARIABLE = `
  query Variable (\$label: ID, \$userId: ID, \$robotId: ID, \$sessionId: ID) {
    USER(id:\$userId) {
      robots(filter:{id:\$robotId}) {
        sessions(filter:{id:\$sessionId}) {
          variables(filter:{label:\$label}) {
            label
            timestamp {formatted}
            variableType
            smallData
            solvable
            tags
            _version
            _id
            ppes {
              solveKey
              suggested
              max
              mean
              lastUpdatedTimestamp {formatted}
            }
            solverData 
            {
              solveKey
              BayesNetOutVertIDs
              BayesNetVertID
              dimIDs
              dimbw
              dims
              dimval
              dontmargin
              eliminated
              infoPerCoord
              initialized
              ismargin
              separator
              solveInProgress
              solvedCount
              variableType
              vecbw
              vecval
              _version
            }
          }
        }
      }
    }
  }`

export const QUERY_VARIABLES = `
  query Variables (\$userId: ID, \$robotId: ID, \$sessionId: ID) {
    USER(id:\$userId) {
      id
      robots(filter:{id:\$robotId}) {
        id
        sessions(filter:{id:\$sessionId}) {
          id
          variables {
            label
            timestamp {formatted}
            variableType
            smallData
            solvable
            tags
            _version
            _id
            ppes {
              solveKey
              suggested
              max
              mean
              lastUpdatedTimestamp {formatted}
            }
            solverData 
            {
              solveKey
              BayesNetOutVertIDs
              BayesNetVertID
              dimIDs
              dimbw
              dims
              dimval
              dontmargin
              eliminated
              infoPerCoord
              initialized
              ismargin
              separator
              solveInProgress
              solvedCount
              variableType
              vecbw
              vecval
              _version
            }
          }
        }
      }
    }
  }`

export const QUERY_FACTOR = `
  query Factor (\$label: ID, \$userId: ID, \$robotId: ID, \$sessionId: ID) {
    USER(id:\$userId) {
      robots(filter:{id:\$robotId}) {
        sessions(filter:{id:\$sessionId}) {
          factors(filter:{label:\$label}) {
            label
            timestamp {formatted}
            fnctype
            tags
            solvable
            data
            _variableOrderSymbols
            _version
          }
        }
      }
    }
  }`

export const QUERY_FACTORS = `
  query Factors (\$userId: ID, \$robotId: ID, \$sessionId: ID) {
    USER(id:\$userId) {
      robots(filter:{id:\$robotId}) {
        sessions(filter:{id:\$sessionId}) {
          factors {
            label
            timestamp {formatted}
            fnctype
            tags
            solvable
            data
            _variableOrderSymbols
            _version
          }
        }
      }
    }
  }`

export const QUERY_FILES = `
  query Files {
    files {
      id
      filename
    }
  }`

export const QUERY_CALIBRATION = `
  query Calibration($fileId: ID!) {
    calibration(fileId: $fileId) {
      placeholder
    }
  }`

export const MUTATION_ADDVARIABLE = `
  mutation addVariable ($variable: FactorGraphInput!) {
    addVariable(variable: $variable)
  }`

export const MUTATION_ADDFACTOR = `
  mutation addFactor ($factor: FactorGraphInput!) {
    addFactor(factor: $factor)
  }`

export const MUTATION_SOLVESESSION = `
  mutation solveSession ($client: ClientInput!) {
    solveSession(client: $client)
  }`

export const MUTATION_SOLVEFEDERATED = `
  mutation solveFederated ($scope: ScopeInput!) {
    solveFederated(scope: $scope)
  }`

export const MUTATION_DEMOCANONICALHEXAGONAL = `
  mutation demoCanonicalHexagonal ($client: ClientInput!) {
    demoCanonicalHexagonal(client: $client)
  }`

export const MUTATION_CREATE_UPLOAD = `
  mutation CreateUpload ($file: FileInput!, $parts: Int) {
    createUpload(file: $file, parts: $parts) {
      uploadId
      file {
        id
        filename
        filesize
      }
      parts {
        partNumber
        url
      }
    }
  }`

export const MUTATION_ABORT_UPLOAD = `
  mutation AbortUpload ($fileId: ID!, $uploadId: ID!) {
    abortUpload(fileId: $fileId, uploadId: $uploadId)
  }`

export const MUTATION_COMPLETE_UPLOAD = `
  mutation CompleteUpload ($fileId: ID!, $completedUpload: CompletedUploadInput!) {
    completeUpload(fileId: $fileId, completedUpload: $completedUpload)
  }`

export const MUTATION_PROC_CALIBRATION = `
  mutation ProcessCalibration ($fileId: ID!) {
    procCalibration(fileId: $fileId)
  }`

export const SUBSCRIPTION_UPDATES = `
  subscription TrackEvents($client: ClientInput!) {
    mutationUpdate(client: $client) {
      requestId,
      action,
      state,
      timestamp
    }
  }`