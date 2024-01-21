import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { RemoveExecutorSchema } from './schema';

export default async function runExecutor(options: RemoveExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['remove'],
    customFlagsBuilder: (options: RemoveExecutorSchema): string[] => {
      const flags = [];
    
      if (options['minify-individually']) {
        flags.push('--minify-individually');
      }
    
      if (options['package']) {
        flags.push('--package', options['package']);
      }
    
      return flags;
    },
  });


  return result;
}
