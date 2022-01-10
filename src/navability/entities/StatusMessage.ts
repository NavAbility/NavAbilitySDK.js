export type MutationUpdate = {
    mutationUpdate: StatusMessage
}

export type StatusMessage = {
    state: String
    action: String
    requestId: String
    timestamp: String
    __typename: String
    
}