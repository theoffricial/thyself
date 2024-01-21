import { PrintExecutorSchema } from './schema';
import { serverlessCommandRunner } from '../../executors-utils';
import { ExecutorContext } from '@nx/devkit';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function runExecutor(options: PrintExecutorSchema, context: ExecutorContext) {
  
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['print'],
    customFlagsBuilder: (options: PrintExecutorSchema): string[] => {
      const flags: string[] = [];
      if (options.format) {
        flags.push('--format', options.format);
      }
    
      if (options.path) {
        flags.push('--path', options.path);
      }
    
      if (options.transform) {
        flags.push('--transform', options.transform);
      }
    
      return flags;
    },
  });


  return result;
}
