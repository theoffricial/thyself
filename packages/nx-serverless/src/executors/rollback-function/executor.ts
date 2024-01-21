import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { RollbackFunctionExecutorSchema } from './schema';

export default async function runExecutor(
  options: RollbackFunctionExecutorSchema, 
  context: ExecutorContext
) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['rollback', 'function'],
    customFlagsBuilder: (options: RollbackFunctionExecutorSchema): string[] => {
      const flags = [];
    
      if (options['function']) {
        flags.push('--function', options['function']);
      }
    
      if (options['function-version']) {
        flags.push('--function-version', options['function-version']);
      }
    
      return flags;
    },
  });


  return result;
}
