import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { DeployListFunctionsExecutorSchema } from './schema';

export default async function runExecutor(
  options: DeployListFunctionsExecutorSchema, context: ExecutorContext
) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['deploy', 'list', 'functions'],
  });

  return result;
}
