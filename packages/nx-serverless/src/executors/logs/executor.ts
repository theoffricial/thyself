import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { LogsExecutorSchema } from './schema';

export default async function runExecutor(options: LogsExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['logs'],
    customFlagsBuilder: (options: LogsExecutorSchema) => {
      const flags: string[] = [];

      if (options.function) {
        flags.push('--function', options.function);
      }

      if (options.tail) {
        flags.push('--tail');
      }

      if (options.startTime) {
        flags.push('--startTime', options.startTime);
      }

      if (options.filter) {
        flags.push('--filter', options.filter);
      }

      if (options.interval) {
        flags.push('--interval', String(options.interval));
      }

      return flags;
    }
  });

  return result;
}
