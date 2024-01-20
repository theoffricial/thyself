import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { InfoExecutorSchema } from './schema';

export default async function runExecutor(options: InfoExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['info'],
  });

  return result;
}
