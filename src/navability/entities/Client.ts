export type Client = {
  userId: string;
  robotId: string;
  sessionId: string;
};

export type Scope = {
  environmentIds: string[];
  userIds: string[];
  robotIds: string[];
  sessionIds: string[];
};

export function Client(userId: string, robotId: string, sessionId: string): Client {
  return {
    userId,
    robotId,
    sessionId,
  };
}

export function Scope(environmentIds: string[], userIds: string[], robotIds: string[], sessionIds: string[]): Scope {
  return {
    environmentIds,
    userIds,
    robotIds,
    sessionIds,
  };
}
