import { PrintExecutorSchema } from './schema';
import { ExecutorContext, workspaceRoot
} from '@nx/devkit';
import path from 'path';
import { buildServerlessCommandArgs, executeCommandWithSpawn, getServerlessRuntime, printInputOptions, resolvedOptionsFn } from '../../executors-utils';
import { buildPrintCustomFlags } from './custom-flags';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function runExecutor(options: PrintExecutorSchema, context: ExecutorContext) {
  
  const resolvedOptions = resolvedOptionsFn(options, context);

  const serverlessConfig = await getServerlessRuntime(resolvedOptions);

  printInputOptions(serverlessConfig, resolvedOptions);

  const customFlags: string[] = buildPrintCustomFlags(resolvedOptions);
  const commandArgs: string[] = buildServerlessCommandArgs(['print'], resolvedOptions, customFlags);

  // Execute Command

  const absoluteServiceDir = path.join(workspaceRoot, resolvedOptions.cwd);
  const success = await executeCommandWithSpawn(commandArgs, absoluteServiceDir, { noColors: resolvedOptions.noColors });

  return { success };
}
