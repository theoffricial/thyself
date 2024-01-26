import { ExecutorContext } from '@nx/devkit';
import { OfflineStartExecutorSchema } from './schema';
import { runServerless } from '../../run-serverless';
import { buildOfflineStartCustomFlags } from './custom-flags';
import { offlineStartValidations } from './validations';

/**
 * Simulates API Gateway to call your lambda functions offline using backward compatible initialization
 * @param options 
 * @param context 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function runExecutor(options: OfflineStartExecutorSchema, context: ExecutorContext): Promise<{ success: boolean; }> {
  

  const result = await runServerless({
    options,
    context,
    subCommandArgs: ['offline', 'start'],
    customValidations: offlineStartValidations,
    customFlagsBuilder: buildOfflineStartCustomFlags,
  });

  return result;
}

