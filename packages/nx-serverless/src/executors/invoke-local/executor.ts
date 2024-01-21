import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { InvokeLocalExecutorSchema } from './schema';

export default async function runExecutor(options: InvokeLocalExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['invoke', 'local'],
  });

  return result;
}
