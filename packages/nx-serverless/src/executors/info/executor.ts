import { ExecutorContext } from '@nx/devkit';
import { runServerless } from '../../run-serverless';
import { InfoExecutorSchema } from './schema';

export default async function runExecutor(options: InfoExecutorSchema, context: ExecutorContext) {
  const result = await runServerless({
    options,
    context,
    subCommandArgs: ['info'],
  });

  return result;
}
