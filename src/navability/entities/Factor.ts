import { BlobEntry } from "./Blob";

const DFG_VERSION = '0.18.11';
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
  id?: string;
  label: string;
  metadata: string;
  
  nstime: string;
  timestamp: string;
  fnctype: string;
  _variableOrderSymbols: string[];
  data: FactorData;
  solvable: number;
  tags: string[];
  blobEntries: BlobEntry[];
  createdTimestamp?: string;
  lastUpdatedTimestamp?: string;
  _type: string;
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
    Z: {
      _type: 'IncrementalInference.PackedFullNormal',
      mu: xythetaPrior,
      cov: [xythetaCovars[0], 0.0, 0.0, 0.0, xythetaCovars[1], 0.0, 0.0, 0.0, xythetaCovars[2]],
    },
  };
  const data = InitializeFactorData();
  data.fnc = fnc;
  data.certainhypo = [1];
  return data;
}

export function Pose2Pose2Data(mus = [1, 0, 0.3333 * PI], sigmas = [0.01, 0.01, 0.01]): FactorData {
  const fnc = {
    Z: {
      _type: 'IncrementalInference.PackedFullNormal',
      mu: mus,
      cov: [sigmas[0], 0.0, 0.0, 0.0, sigmas[1], 0.0, 0.0, 0.0, sigmas[2]],
    },
  };
  const data = InitializeFactorData();
  data.fnc = fnc;
  data.certainhypo = [1, 2];
  return data;
}

export function Pose2AprilTag4CornersData(
  id: number,
  corners: number[],
  homography: number[],
  K: number[] = [300.0, 0.0, 0.0, 0.0, 300.0, 0.0, 180.0, 120.0, 1.0],
  taglength: number = 0.25,
): FactorData {
  const fnc = {
    _type: '/application/JuliaLang/PackedPose2AprilTag4Corners',
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
    _variableOrderSymbols: variableOrderSymbols,
    data,
    solvable: 1,
    tags,
    timestamp,
    _version: DFG_VERSION,
    blobEntries: [],
    metadata: btoa('{}'),
    _type: "FACTOR"
  };
  return result;
}
