import { NavAbilityClient, getStatusesLatest } from '../..';

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForCompletion(
  navAbilityClient: NavAbilityClient,
  requestIds: string[],
  maxSeconds: number = 60,
  expectedStatuses: string[] = ['Complete', 'Failed'],
  exceptionMessage: string = 'Requests did not complete in time',
) {
  let waitTime = maxSeconds;
  let tasksComplete = false;
  while (!tasksComplete) {
    const statuses = await getStatusesLatest(navAbilityClient, requestIds);
    tasksComplete = statuses.every((s: any) => expectedStatuses.includes(s.state));
    if (tasksComplete) {
      break;
    } else {
      await sleep(2000);
      waitTime -= 2;
      if (waitTime <= 0) {
        throw Error(exceptionMessage);
      }
    }
  }
}
