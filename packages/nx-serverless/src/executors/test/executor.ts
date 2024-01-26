import { ExecutorContext } from '@nx/devkit';
import { runServerless } from '../../run-serverless';
import { TestExecutorSchema } from './schema';

export default async function runExecutor(options: TestExecutorSchema, context: ExecutorContext) {
  const result = await runServerless({
    options,
    context,
    subCommandArgs: ['test'],
    customFlagsBuilder: (options: TestExecutorSchema): string[] => {
      const flags = [];

      if (options['function']) {
        flags.push('--function', options['function']);
      }

      if (options['test']) {
        flags.push('--test', options['test']);
      }

      return flags;

    }
  });

  return result;
}
