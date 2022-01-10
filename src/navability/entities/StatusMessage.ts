export type MutationUpdate = {
  mutationUpdate: StatusMessage;
};

export type StatusMessage = {
  state: string;
  action: string;
  requestId: string;
  timestamp: string;
  __typename: string;
};
