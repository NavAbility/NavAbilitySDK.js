export type Client = {
    userId:String
    robotId:String
    sessionId:String
}

export type Scope = {
    environmentIds: String[],
    userIds: String[],
    robotIds: String[],
    sessionIds: String[]
}

export function Client(userId: String, robotId: String, sessionId: String):Client {
    return {
        userId,
        robotId,
        sessionId
    }
}

export function Scope(environmentIds: String[], userIds: String[], robotIds: String[], sessionIds: String[]):Scope {
    return {
        environmentIds,
        userIds,
        robotIds,
        sessionIds
    }
}