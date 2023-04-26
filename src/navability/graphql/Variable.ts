export const GQL_FRAGMENT_VARIABLES = `
fragment FRAGMENT_BLOBENTRY on BlobEntry {
  id
  blobId
  originId
  label
  blobstore
  hash
  origin
  description
  mimeType
  metadata
  timestamp
  _type
  _version
}
fragment FRAGMENT_PPE on PPE {
  id
  solveKey
  suggested
  max
  mean
  _type
  _version
  createdTimestamp
  lastUpdatedTimestamp
}
fragment FRAGMENT_SOLVERDATA on SolverData {
  id
  vecval
  dimval
  vecbw
  dimbw
  BayesNetOutVertIDs
  dimIDs
  dims
  eliminated
  BayesNetVertID
  separator
  variableType
  initialized
  infoPerCoord
  ismargin
  dontmargin
  solveInProgress
  solvedCount
  solveKey
  _version  
}
fragment FRAGMENT_VARIABLE_SKELETON on Variable {
  id
  label
  tags
}
fragment FRAGMENT_VARIABLE_SUMMARY on Variable {
  timestamp
  nstime
  ppes {
    ...FRAGMENT_PPE
  }
  blobEntries {
    ...FRAGMENT_BLOBENTRY
  }
  variableType
  _version
}
fragment FRAGMENT_VARIABLE on Variable {
  metadata
  solvable
  solverData
  {
    ...FRAGMENT_SOLVERDATA
  }
}
`;

export const GQL_GETVARIABLE = `
query QUERY_GET_VARIABLE(
  $userLabel: EmailAddress!
  $robotLabel: String!
  $sessionLabel: String!
  $variableLabel: String!
  $fields_summary: Boolean! = true
  $fields_full: Boolean! = true
) {
  users(where: { label: $userLabel }) {
    robots(where: { label: $robotLabel }) {
      sessions(where: { label: $sessionLabel }) {
        variables(where: { label: $variableLabel }) {
          ...FRAGMENT_VARIABLE_SKELETON
          ...FRAGMENT_VARIABLE_SUMMARY @include(if: $fields_summary)
          ...FRAGMENT_VARIABLE @include(if: $fields_full)
        }
      }
    }
  }
}`;

export const GQL_GETVARIABLES = `
query QUERY_GET_VARIABLES(
  $userLabel: EmailAddress!
  $robotLabel: String!
  $sessionLabel: String!
  $fields_summary: Boolean! = true
  $fields_full: Boolean! = true
) {
  users(where: { label: $userLabel }) {
    robots(where: { label: $robotLabel }) {
      sessions(where: { label: $sessionLabel }) {
        variables {
          ...FRAGMENT_VARIABLE_SKELETON
          ...FRAGMENT_VARIABLE_SUMMARY @include(if: $fields_summary)
          ...FRAGMENT_VARIABLE @include(if: $fields_full)
        }
      }
    }
  }
}`;

