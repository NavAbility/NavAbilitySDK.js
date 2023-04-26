export type Client = {
  userLabel: string;
  robotLabel: string;
  sessionLabel: string;
};

export type Scope = {
  environmentIds: string[];
  userIds: string[];
  robotIds: string[];
  sessionIds: string[];
};

export function Client(userLabel: string, robotLabel: string, sessionLabel: string): Client {
  return {
    userLabel,
    robotLabel,
    sessionLabel,
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
