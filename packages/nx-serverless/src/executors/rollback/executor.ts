import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { RollbackExecutorSchema } from './schema';

export default async function runExecutor(options: RollbackExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['rollback'],
    customFlagsBuilder: (options: RollbackExecutorSchema): string[] => {
      const flags = [];
    
      if (options['timestamp']) {
        flags.push('--timestamp', options['timestamp']);
      }
    
      return flags;
    },
  });


  return result;
}
