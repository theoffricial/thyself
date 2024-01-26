import { ExecutorContext } from '@nx/devkit';
import { runServerless } from '../../run-serverless';
import { RemoveExecutorSchema } from './schema';

export default async function runExecutor(options: RemoveExecutorSchema, context: ExecutorContext) {
  const result = await runServerless({
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
