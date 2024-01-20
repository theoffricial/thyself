import { ExecutorContext } from '@nx/devkit';
import { DeployFunctionExecutorSchema } from './schema';
import { serverlessCommandRunner } from '../../executors-utils';

export default async function runExecutor(
  options: DeployFunctionExecutorSchema,
  context: ExecutorContext
) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['deploy', 'function'],
    customFlagsBuilder: (options: DeployFunctionExecutorSchema) => {
      const flags: string[] = [];

      if (options.function) {
        flags.push('--function', options.function);
      }

      if (options['update-config']) {
        flags.push('--update-config');
      }

      if (options['force']) {
        flags.push('--force');
      }

      return flags;
    },
  });

  return result;
}
