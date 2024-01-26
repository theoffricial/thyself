import { ExecutorContext } from '@nx/devkit';
import { runServerless } from '../../run-serverless';
import { DeployListFunctionsExecutorSchema } from './schema';

export default async function runExecutor(
  options: DeployListFunctionsExecutorSchema, context: ExecutorContext
) {
  const result = await runServerless({
    options,
    context,
    subCommandArgs: ['deploy', 'list', 'functions'],
  });

  return result;
}
