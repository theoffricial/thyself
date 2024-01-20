import { DeployListExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';


export default async function runExecutor(options: DeployListExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['deploy', 'list'],
  });

  return result;
}
