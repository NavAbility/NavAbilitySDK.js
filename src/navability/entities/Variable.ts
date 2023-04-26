import { BlobEntry } from "./Blob";

const DFG_VERSION = '0.21.1';

export enum QueryDetail {
  LABEL = 'LABEL',
  SKELETON = 'SKELETON',
  SUMMARY = 'SUMMARY',
  FULL = 'FULL',
}

export enum VariableType {
  POINT2 = 'RoME.Point2',
  POSE2 = 'RoME.Pose2',
}

export type PPE = {
  id?: string, 
  solveKey: string,
  suggested: number[],
  max: number[],
  mean: number[],
  _type: string,
  _version: string,
  createdTimestamp: string,
  lastUpdatedTimestamp: string
}

export type SolverData = {
  id?: string
  solveKey: string
  BayesNetOutVertIDs: string[]
  BayesNetVertID: string
  dimIDs: number[]
  dimbw: number
  dims: number
  dimval: number
  dontmargin: boolean
  eliminated: boolean
  infoPerCoord: number[]
  initialized: boolean
  ismargin: boolean
  separator: string[]
  solveInProgress: number
  solvedCount: number
  variableType: string
  vecbw: number[]
  vecval: number[]
  covar: number[]

  _version: string
  createdTimestamp?: string
  lastUpdatedTimestamp?: string
}

export type Variable = {
  id?: string;
  label: string;
  nstime: string;
  timestamp: string;
  variableType: string;
  tags: string[];
  _version: string;
  solvable: number;

  metadata: string;
  createdTimestamp?: string;
  lastUpdatedTimestamp?: string;

  blobEntries?: BlobEntry[];
  ppes: PPE[];
  solverData: SolverData[];
};

export function Variable(
  label: string,
  type: string,
  tags: string[] = ['VARIABLE'],
  timestamp: string = new Date().toISOString(),
): Variable {
  const solverData:SolverData[] = [ {
      vecval: [
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
        0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
      ],
      dimval: 3,
      vecbw: [0.0, 0.0, 0.0],
      dimbw: 3,
      BayesNetOutVertIDs: [],
      dimIDs: [0, 1, 2],
      dims: 3,
      eliminated: false,
      BayesNetVertID: '_null',
      separator: [],
      variableType: type,
      initialized: false,
      infoPerCoord: [0.0, 0.0, 0.0],
      ismargin: false,
      dontmargin: false,
      solveInProgress: 0,
      solvedCount: 0,
      solveKey: 'default',
      _version: DFG_VERSION,
      covar: []
    }];
  const result: Variable = {
    id: undefined,
    label,
    metadata: btoa('{}'),
    nstime: '0',
    variableType: type,
    ppes: [],
    solvable: 1,
    blobEntries: [],
    solverData: solverData,
    tags: tags,
    timestamp,
    _version: DFG_VERSION,
  };
  return result;
}
