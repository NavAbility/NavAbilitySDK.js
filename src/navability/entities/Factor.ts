const DFG_VERSION = '0.17.1';
const PI = 3.14159;

export enum FactorType {
  PRIORPOSE2 = 'PriorPose2',
  POSE2POSE2 = 'Pose2Pose2',
  POSE2APRILTAG4CORNERS = 'Pose2AprilTag4Corners',
}

type FactorData = {
  eliminated: boolean;
  potentialused: boolean;
  edgeIDs: string[];
  fnc: any;
  multihypo: number[];
  certainhypo: number[];
  nullhypo: number;
  solveInProgress: number;
  inflation: number;
};

export type Factor = {
  label: string;
  nstime: string;
  fnctype: string;
  _variableOrderSymbols: string;
  data: string;
  solvable: number;
  tags: string;
  timestamp: string;
  _version: string;
};

function InitializeFactorData(): FactorData {
  return {
    eliminated: false,
    potentialused: false,
    edgeIDs: [],
    fnc: {},
    multihypo: [],
    certainhypo: [],
    nullhypo: 0.0,
    solveInProgress: 0,
    inflation: 3.0,
  };
}

export function PriorPose2Data(xythetaPrior = [0.0, 0.0, 0.0], xythetaCovars = [0.01, 0.01, 0.01]): FactorData {
  const fnc = {
    str: `FullNormal(\ndim: 3\nμ: [${xythetaPrior[0]}, ${xythetaPrior[1]}, ${xythetaPrior[2]}]\nΣ: [${xythetaCovars[0]} 0.0 0.0; 0.0 ${xythetaCovars[1]} 0.0; 0.0 0.0 ${xythetaCovars[2]}])`,
  };
  const data = InitializeFactorData();
  data.fnc = fnc;
  data.certainhypo = [1];
  return data;
}

export function Pose2Pose2Data(mus = [1, 0, 0.3333 * PI], sigmas = [0.01, 0.01, 0.01]): FactorData {
  const fnc = {
    datastr: `FullNormal(\ndim: 3\nμ: [${mus.join(', ')}]\nΣ: [${sigmas[0]} 0.0 0.0; 0.0 ${sigmas[1]} 0.0; 0.0 0.0 ${
      sigmas[2]
    }]\n)`,
  };
  const data = InitializeFactorData();
  data.fnc = fnc;
  data.certainhypo = [1, 2];
  return data;
}

export function Pose2AprilTag4CornersData(
  id: string,
  corners: any,
  homography: any,
  K = [300.0, 0.0, 0.0, 0.0, 300.0, 0.0, 180.0, 120.0, 1.0],
  taglength = 0.25,
): FactorData {
  const fnc = {
    mimeType: '/application/JuliaLang/PackedPose2AprilTag4Corners',
    corners,
    homography,
    K,
    taglength,
    id,
  };
  const data = InitializeFactorData();
  data.fnc = fnc;
  data.certainhypo = [1, 2];
  return data;
}

export function Factor(
  label: string,
  fncType: string,
  variableOrderSymbols: string[],
  data: FactorData,
  tags: string[] = ['FACTOR'],
  timestamp: string = new Date().toISOString(),
): Factor {
  data.certainhypo = variableOrderSymbols.map((x, idx) => idx + 1);

  const result: Factor = {
    label,
    nstime: '0',
    fnctype: fncType,
    _variableOrderSymbols: JSON.stringify(variableOrderSymbols),
    data: JSON.stringify(data),
    solvable: 1,
    tags: JSON.stringify(tags),
    timestamp,
    _version: DFG_VERSION,
  };
  return result;
}
