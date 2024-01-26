import type { ExecutorContext } from '@nx/devkit';
import type { DoctorExecutorSchema } from './schema';
import { runServerless } from '../../run-serverless';

export default async function runExecutor(options: DoctorExecutorSchema, context: ExecutorContext) {
  const result = await runServerless({
    options,
    context,
    subCommandArgs: ['doctor'],
  });

  return result;
}
