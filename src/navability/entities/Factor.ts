const DFG_VERSION = "0.17.1"
const PI = 3.14159

export enum FactorType {
    PRIORPOSE2 = "PriorPose2",
    POSE2POSE2 = "Pose2Pose2",
    POSE2APRILTAG4CORNERS = "Pose2AprilTag4Corners"
}

type FactorData = {
    eliminated: Boolean
    potentialused: Boolean
    edgeIDs: String[]
    fnc: any
    multihypo: Number[]
    certainhypo: Number[]
    nullhypo: Number
    solveInProgress: Number
    inflation: Number
}

export type Factor = {
    label: String
    nstime: String
    fnctype: String
    _variableOrderSymbols: String
    data: String
    solvable: number
    tags: String
    timestamp: String
    _version: String
}

function InitializeFactorData():FactorData {
    return {
        eliminated: false,
        potentialused: false,
        edgeIDs: [],
        fnc: {},
        multihypo: [],
        certainhypo: [],
        nullhypo: 0.0,
        solveInProgress: 0,
        inflation: 3.0
     }
}

export function PriorPose2Data(xytheta_prior = [0.0, 0.0, 0.0], xytheta_covars = [0.01, 0.01, 0.01]):FactorData {
    let fnc = {
      str: `FullNormal(\ndim: 3\nμ: [${xytheta_prior[0]}, ${xytheta_prior[1]}, ${xytheta_prior[2]}]\nΣ: [${xytheta_covars[0]} 0.0 0.0; 0.0 ${xytheta_covars[1]} 0.0; 0.0 0.0 ${xytheta_covars[2]}])`
    }
    let data = InitializeFactorData()
    data.fnc = fnc
    data.certainhypo = [1]
    return data
}

export function Pose2Pose2Data(mus=[1,0,0.3333*PI], sigmas=[0.01,0.01,0.01]):FactorData {
    let fnc = {
        datastr: `FullNormal(\ndim: 3\nμ: [${mus.join(", ")}]\nΣ: [${sigmas[0]} 0.0 0.0; 0.0 ${sigmas[1]} 0.0; 0.0 0.0 ${sigmas[2]}]\n)`
    }
    let data = InitializeFactorData()
    data.fnc = fnc
    data.certainhypo = [1, 2]
    return data
}

export function Pose2AprilTag4CornersData(id:string, corners:any, homography:any, K=[300.0,0.0,0.0,0.0,300.0,0.0,180.0,120.0,1.0], taglength=0.25):FactorData {
    let fnc = {
      mimeType: "/application/JuliaLang/PackedPose2AprilTag4Corners",
      corners: corners,
      homography: homography,
      K: K,
      taglength: taglength,
      id: id
    }
    let data = InitializeFactorData()
    data.fnc = fnc
    data.certainhypo = [1, 2]
    return data
  };


export function Factor(label:String, fncType: String, variableOrderSymbols:String[], data:FactorData, tags:String[]=["FACTOR"], timestamp:String = (new Date()).toISOString()):Factor {
    data.certainhypo = variableOrderSymbols.map((x, idx)=>idx+1)
    
    let result:Factor = {
        label: label,
        nstime: "0",
        fnctype: fncType,
        _variableOrderSymbols: JSON.stringify(variableOrderSymbols),
        data: JSON.stringify(data),
        solvable: 1,
        tags: JSON.stringify(tags),
        timestamp: timestamp,
        _version: DFG_VERSION
    }
    return result
}

