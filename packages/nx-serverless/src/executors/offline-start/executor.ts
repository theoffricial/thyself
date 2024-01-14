/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutorContext, workspaceRoot } from '@nx/devkit';
import { OfflineStartExecutorSchema } from './schema';
import parseServerlessConfig from 'serverless/lib/configuration/read';
import path from 'path';
import { Serverless } from 'serverless/aws';;
import { buildServerlessCommandArgs, printInputOptions, executeCommandWithSpawn, resolvedOptionsFn } from '../../executors-utils';
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
  
  const resolvedOptions = resolvedOptionsFn(options, context);

  // Get Serverless

  // Get service directory from options
  const absoluteServiceDir = path.join(workspaceRoot, resolvedOptions.cwd);
  // const relativeConfigurationPath = path.join(resolvedCwd, resolvedOptions.serverlessConfigurationFileName);
  const configurationPath = path.join(absoluteServiceDir, resolvedOptions.serverlessConfigurationFileName);
  const config = (await parseServerlessConfig(configurationPath)) as Serverless;
  
  // Print Input Summary

  printInputOptions(config, resolvedOptions);
  
  // Validations (Unique per command)

  offlineStartValidations(config, resolvedOptions);

  // Get Custom Flags (Unique per command)

  const customFlags: string[] = buildOfflineStartCustomFlags(resolvedOptions);

  // Build Command

  const commandArgs: string[] = buildServerlessCommandArgs(['offline', 'start'], resolvedOptions, customFlags);

  // Execute Command

  const success = await executeCommandWithSpawn(commandArgs, absoluteServiceDir, { noColors: resolvedOptions.noColors });

  return { success };
}

