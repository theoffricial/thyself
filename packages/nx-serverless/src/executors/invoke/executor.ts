import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { InvokeExecutorSchema } from './schema';

export default async function runExecutor(options: InvokeExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['invoke'],
  });

  return result;
}
