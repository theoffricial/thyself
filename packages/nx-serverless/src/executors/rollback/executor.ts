import { ExecutorContext } from '@nx/devkit';
import { runServerless } from '../../run-serverless';
import { RollbackExecutorSchema } from './schema';

export default async function runExecutor(options: RollbackExecutorSchema, context: ExecutorContext) {
  const result = await runServerless({
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
