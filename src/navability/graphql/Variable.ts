export const GQL_FRAGMENT_VARIABLES = `
fragment ppe_fields on Ppe {
  solveKey
  suggested
  max
  mean
  lastUpdatedTimestamp
}
fragment solverdata_fields on SolverData {
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
fragment variable_skeleton_fields on Variable {
	label
  tags
}
fragment variable_summary_fields on Variable {
  timestamp
  ppes {
    ...ppe_fields
  }
  variableType
  _version
}
fragment variable_full_fields on Variable{
  smallData
  solvable
  solverData
  {
		...solverdata_fields
  }
}
`;

export const GQL_GETVARIABLE = `
query sdk_get_variable(
  	$userId: ID!, 
  	$robotId: ID!, 
  	$sessionId: ID!,
    $label: ID!) {
	users(where:{id:$userId}){
		robots(where:{id: $robotId}) {
      sessions(where:{id: $sessionId}) {
        variables(where:{label: $label}) {
          ...variable_skeleton_fields
          ...variable_summary_fields
          ...variable_full_fields
        }
      }
    }
  }
}`;

export const GQL_GETVARIABLES = `
query sdk_get_variables(
  	$userId: ID!, 
  	$robotId: ID!, 
  	$sessionId: ID!,
  	$fields_summary: Boolean! = false, 
  	$fields_full: Boolean! = false){
	users(where:{id:$userId}) {
    name
		robots(where:{id: $robotId}) {
      name
      sessions(where:{id: $sessionId}){
        name
        variables {
          ...variable_skeleton_fields
          ...variable_summary_fields @include(if: $fields_summary)
          ...variable_full_fields @include(if: $fields_full)
        }
      }
    }
  }
}`;

export const GQL_GETVARIABLESFILTERED = `
query sdk_get_variables_filtered(
  	$userId: ID!, 
  	$robotIds: [ID!]!, 
  	$sessionIds: [ID!]!, 
    $variable_label_regexp: String = ".*",
    $variable_tags: [String] = ["VARIABLE"],
    $solvable: Int! = 0,
  	$fields_summary: Boolean! = false, 
  	$fields_full: Boolean! = false){
	users(where:{id:$userId}){
    name
		robots(where:{id_IN: $robotIds}) {
      name
      sessions(where:{id_IN: $sessionIds}){
        name
        variables(where:{
            label_MATCHES: $variable_label_regexp, 
          	tags: $variable_tags, 
          	solvable_GTE: $solvable}) {
          ...variable_skeleton_fields
          ...variable_summary_fields @include(if: $fields_summary)
          ...variable_full_fields @include(if: $fields_full)
        }
      }
    }
  }
}`;
