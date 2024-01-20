import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { DeployExecutorSchema } from './schema';

export default async function runExecutor(options: DeployExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['offline', 'start'],
    customFlagsBuilder: (options: DeployExecutorSchema): string[] => {
      const flags: string[] = [];
      
      if (options['aws-s3-accelerate']) {
        flags.push('--aws-s3-accelerate');
      }
    
      if (options['minify-template']) {
        flags.push('--minify-template');
      }
    
      if (options['enforce-hash-update']) {
        flags.push('--enforce-hash-update');
      }
    
      if (options['conceal']) {
        flags.push('--conceal');
      }
    
      if (options['force']) {
        flags.push('--force');
      }
    
      return flags;
    }
  });


  return result;
}
