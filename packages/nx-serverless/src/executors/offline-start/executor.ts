/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutorContext, logger, workspaceRoot, workspaceLayout } from '@nx/devkit';
import { OfflineStartExecutorSchema } from './schema';
import parseServerlessConfig from 'serverless/lib/configuration/read';
import path from 'path';
import { Serverless } from 'serverless/aws';;
import { buildServerlessCommandArgs, printInputOptions, executeCommandWithSpawn } from '../../executors-utils';
import { buildOfflineStartCustomFlags } from './custom-flags';

/**
 * Simulates API Gateway to call your lambda functions offline using backward compatible initialization
 * @param options 
 * @param context 
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function runExecutor(options: OfflineStartExecutorSchema, context: ExecutorContext): Promise<{ success: boolean; }> {
  const {appsDir} = workspaceLayout();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { _, ...restOptions } = options as OfflineStartExecutorSchema & { _: any };
  const resolvedCwd = options.cwd || (path.join(appsDir, context.projectName));
  
  const resolvedOptions: OfflineStartExecutorSchema = {
    ...restOptions,
    stage: options.stage || 'dev',
    debug: restOptions.debug || false,
    verbose: restOptions.verbose || false,
    cwd: resolvedCwd,
    serverlessConfigurationFileName: restOptions.serverlessConfigurationFileName,
  };

  // Get service directory from options
  const absoluteServiceDir = path.join(workspaceRoot, resolvedCwd);
  // const relativeConfigurationPath = path.join(resolvedCwd, resolvedOptions.serverlessConfigurationFileName);
  const configurationPath = path.join(absoluteServiceDir, resolvedOptions.serverlessConfigurationFileName);
  const config = (await parseServerlessConfig(configurationPath)) as Serverless;

  printInputOptions(config, resolvedOptions);
  
  if (!Array.isArray(config.plugins) || !config.plugins.includes('serverless-offline')) {
    logger.error('nx-serverless:offline-start cannot be run when \'serverless-offline\' plugin is not installed and defined in serverless.ts');
    return {
      success: false,
    }
  }

  const customFlags: string[] = buildOfflineStartCustomFlags(resolvedOptions);
  const commandArgs: string[] = buildServerlessCommandArgs(['offline', 'start'], resolvedOptions, customFlags);

  const success = await executeCommandWithSpawn(commandArgs, absoluteServiceDir, { noColors: resolvedOptions.noColors });
  return { success };
}

