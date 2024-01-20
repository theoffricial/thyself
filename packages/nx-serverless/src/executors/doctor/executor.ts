import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { DoctorExecutorSchema } from './schema';

export default async function runExecutor(options: DoctorExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['doctor'],
  });

  return result;
}
