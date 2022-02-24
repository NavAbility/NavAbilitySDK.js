import { NavAbilityHttpsClient, Client } from '../..'
import { ls, addVariable, Variable } from '../..'
import { lsf, addFactor, getFactor, Factor, FactorType } from '../..'
import { Pose2AprilTag4CornersData, Pose2Pose2Data } from '../..'

jest.setTimeout(180 * 1000)
const navAbilityApi = "http://localhost:4343"
const userId = "Guest"
const robotId = "DemoRobot"
const MAX_POLLING_TRIES = 150

export function sleep(seconds:number) {
  return new Promise(resolve => setTimeout(resolve, seconds*1000));
}

const waitForVariables = async (nvaClient:any, context:any, awaitingVariableLabels:string[]) => {
  console.info("Short poll cloud to confirm variables are saved...")
  let variablesSuccessfullySaved = false
  for (let i=0;i<MAX_POLLING_TRIES;i++) {
      const savedVariableLabels = await ls(nvaClient,context)
      const diff = awaitingVariableLabels.filter(l => !savedVariableLabels.includes(l))
      if (diff.length < 1) {
          variablesSuccessfullySaved = true
          break
      }
      await sleep(2)
      console.info(`Polling for: ${diff}`)
  }
  if (!variablesSuccessfullySaved) { throw("Failed to save variables.") }
}

const waitForFactors = async (nvaClient:any, context:any, awaitingFactorLabels:string[]) => {
  let factorsSuccessfullySaved = false
  for (let i=0;i<MAX_POLLING_TRIES;i++) {
      const savedFactorLabels = await lsf(nvaClient,context)
      const diff = awaitingFactorLabels.filter(l => !savedFactorLabels.includes(l))
      if (diff.length < 1) {
          factorsSuccessfullySaved = true
          break
      }
      await sleep(2)
      console.info(`Polling for: ${diff}`)
  }
  if(!factorsSuccessfullySaved) { throw("Failed to save factors.") }
}

test('AddPose2Pose2', async () => {
  const sessionId = "DemoTest" + (Math.random() + 1).toString(36).substring(7) //randstring alg
  const nvaClient = NavAbilityHttpsClient(navAbilityApi)
  const context = Client(userId,robotId,sessionId)

  const x0 = Variable("x0", "RoME.Pose2")
  const x1 = Variable("x1", "RoME.Pose2")
  addVariable(nvaClient,context,x0)
  addVariable(nvaClient,context,x1)
  await waitForVariables(nvaClient, context, ["x0","x1"])
  
  const odometryFactorData = Pose2Pose2Data()
  const odometryFactor = Factor("x0x1f1", FactorType.POSE2POSE2, ["x0","x1"], odometryFactorData) // TODO: Use FactorType Enum
  addFactor(nvaClient,context,odometryFactor)
  await waitForFactors(nvaClient, context, ["x0x1f1"])

  const savedFactor = await getFactor(nvaClient, context, "x0x1f1")

  expect(savedFactor._version).toBe(odometryFactor._version);
  expect(savedFactor._variableOrderSymbols).toStrictEqual(odometryFactor._variableOrderSymbols);
  // expect(savedFactor.data).toStrictEqual(odometryFactor.data);
  expect(savedFactor.label).toBe(odometryFactor.label);
  expect(savedFactor.tags).toStrictEqual(odometryFactor.tags);
  expect(savedFactor.timestamp).toBe(odometryFactor.timestamp);
});

test('AddPose2AprilTag4Corners', async () => {
  const sessionId = "DemoTest" + (Math.random() + 1).toString(36).substring(7) //randstring alg
  const nvaClient = NavAbilityHttpsClient(navAbilityApi)
  const context = Client(userId,robotId,sessionId)

  const x0 = Variable("x0", "RoME.Pose2")
  const l1 = Variable("l1", "RoME.Pose2")
  addVariable(nvaClient,context,x0)
  addVariable(nvaClient,context,l1)
  await waitForVariables(nvaClient, context, ["x0","l1"])

  const testCorners = [338.4,160.9,369.1,161.1,370.2,129.4,339.2,128.8]
  const testHomography = [-0.8, -0.07, -15.9, -0.05, -0.75, -6.5, -0.0003, -0.0002, -0.045]
  const aprilTagFactorData = Pose2AprilTag4CornersData(1,testCorners,testHomography)
  const aprilTagFactor = Factor("x0l1f1",FactorType.POSE2APRILTAG4CORNERS, ["x0","l1"], aprilTagFactorData)
  addFactor(nvaClient,context,aprilTagFactor)
  await waitForFactors(nvaClient, context, ["x0l1f1"])

  const savedFactor = await getFactor(nvaClient, context, "x0l1f1")

  expect(savedFactor._version).toBe(aprilTagFactor._version);
  expect(savedFactor._variableOrderSymbols).toStrictEqual(aprilTagFactor._variableOrderSymbols);
  // expect(savedFactor.data).toStrictEqual(odometryFactor.data);
  expect(savedFactor.label).toBe(aprilTagFactor.label);
  expect(savedFactor.tags).toStrictEqual(aprilTagFactor.tags);
  expect(savedFactor.timestamp).toBe(aprilTagFactor.timestamp);
});