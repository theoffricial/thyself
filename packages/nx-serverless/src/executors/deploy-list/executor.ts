import { DeployListExecutorSchema } from './schema';
import { ExecutorContext } from '@nx/devkit';
import { runServerless } from '../../run-serverless';


export default async function runExecutor(options: DeployListExecutorSchema, context: ExecutorContext) {
  const result = await runServerless({
    options,
    context,
    subCommandArgs: ['deploy', 'list'],
  });

  return result;
}
