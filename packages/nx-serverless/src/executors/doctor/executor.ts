import type { ExecutorContext } from '@nx/devkit';
import type { DoctorExecutorSchema } from './schema';
import { serverlessCommandRunner } from '../../executors-utils';

export default async function runExecutor(options: DoctorExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['invoke'],
  });

  return result;
}
