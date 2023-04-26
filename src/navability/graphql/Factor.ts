export const GQL_FRAGMENT_FACTORS = `
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
fragment factor_skeleton_fields on Factor {
  id
	label
  tags
  _variableOrderSymbols
}
fragment factor_summary_fields on Factor {
  ...factor_skeleton_fields
  timestamp
  nstime
  blobEntries {
    ...FRAGMENT_BLOBENTRY
  }
  _version
}
fragment factor_full_fields on Factor {
  fnctype
  solvable
  data
}
`;

export const GQL_GETFACTOR = `
query sdk_get_factor(
  $userLabel: EmailAddress!
  $robotLabel: String!
  $sessionLabel: String!
  $factorLabel: String!) {
	users(where:{label:$userLabel}) {
		robots(where:{label: $robotLabel}) {
      sessions(where:{label: $sessionLabel}) {
        factors(where:{label: $factorLabel}) {
          ...factor_skeleton_fields
          ...factor_summary_fields
          ...factor_full_fields
        }
      }
    }
  }
}`;

export const GQL_GETFACTORS = `
query sdk_get_factors(
    $userLabel: EmailAddress!,
    $robotLabel: String!,
    $sessionLabel: String!,
  	$fields_summary: Boolean! = false, 
  	$fields_full: Boolean! = false){
  users(where:{label:$userLabel}) {
    label
    robots(where:{label: $robotLabel}) {
      label
      sessions(where:{label: $sessionLabel}){
        label
        factors {
          ...factor_skeleton_fields
          ...factor_summary_fields @include(if: $fields_summary)
          ...factor_full_fields @include(if: $fields_full)
        }
      }
    }
  }
}`;