import { NavAbilityHttpsClient, Client, getVariables, QueryDetail, getVariable } from '../../dist'
import { ls, Variable } from '../../dist'

jest.setTimeout(180 * 1000)
const navAbilityApi = "https://api.p1.navability.io"
const userLabel = "guest@navability.io",
  robotLabel = "TestRobot",
  sessionLabel = "TestSession_2P5X";

test('getVariables_Summaries', async () => {
  //Arrange: Client and context.
  const nvaClient = NavAbilityHttpsClient(navAbilityApi)
  const context = Client(userLabel,robotLabel,sessionLabel)

  // Act: Get the variables.
  const variables = await getVariables(nvaClient, context);

  // Assert: Existence
  expect(variables.length).toBeGreaterThan(0);
  for(const v of variables) {
    expect(v.id).toBeDefined();
  }
});

test('getVariables', async () => {
  //Arrange: Client and context.
  const nvaClient = NavAbilityHttpsClient(navAbilityApi)
  const context = Client(userLabel,robotLabel,sessionLabel)

  // Act: Get the variables.
  const variables = await getVariables(nvaClient, context, QueryDetail.FULL);

  // Assert: Existence
  expect(variables.length).toBeGreaterThan(0);
  for(const v of variables) {
    expect(v.id).toBeDefined();
    expect(v.blobEntries).toBeDefined();
    expect(v.ppes).toBeDefined();
    expect(v.solverData).toBeDefined();
  }
});

test('getVariable', async () => {
  //Arrange: Client and context.
  const nvaClient = NavAbilityHttpsClient(navAbilityApi)
  const context = Client(userLabel,robotLabel,sessionLabel)

  // Act: Get the variables.
  const variables = await getVariables(nvaClient, context);

  // Assert: Existence
  expect(variables.length).toBeGreaterThan(0);

  // Act: Get the first variable
  const variable = await getVariable(nvaClient, context, variables[0].label);
  expect(variable).toBeDefined();
  expect(variable.id).toBe(variables[0].id);

});
