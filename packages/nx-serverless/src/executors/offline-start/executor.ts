/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutorContext, logger, workspaceRoot } from '@nx/devkit';
import { OfflineStartExecutorSchema } from './schema';
import prettyjson from 'prettyjson';
import parseServerlessConfig from 'serverless/lib/configuration/read';
import path from 'path';
import { Serverless } from 'serverless/aws';
import { promisify } from 'util';
import { ExecException, exec, spawn } from 'child_process';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

// declare module 'serverless/lib/configuration/read' {
//   export default function parseServerlessConfig(configurationPath: string): Promise<Serverless>;
// }
// import path from 'path';
const colorize = (chalkColorFn: chalk.Chalk, s: string, noColors: OfflineStartExecutorSchema['noColors']) => noColors ? stripAnsi(s) : chalkColorFn(s);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function runExecutor(options: OfflineStartExecutorSchema, context: ExecutorContext) {
  console.log('Executor ran for OfflineStart', options);

  const resolvedOptions: OfflineStartExecutorSchema = {
    ...options,
    awsProfile: options.awsProfile || 'default',
    stage: options.stage || 'dev',
    region: options.region || 'us-east-1',
    debug: options.debug || false,
    verbose: options.verbose || false,
    cwd: options.cwd || workspaceRoot,
    noColors: typeof options.noColors === 'boolean' ? options.noColors : true,
  };

  const serviceDir = path.join(workspaceRoot, 'stacks', context.projectName); // Get service directory from options
  const configurationPath = path.join(serviceDir, 'serverless.ts');
  const config = (await parseServerlessConfig(configurationPath)) as Serverless;

  logger.debug(
    'serverless print options\n' + 
    '------------------------\n' + 
    `${prettyjson.render(resolvedOptions, {noColor: resolvedOptions.noColors, keysColor: 'blue', dashColor: 'magenta'})}\n` +
    `${prettyjson.render({ runtime: config.provider.runtime }, {noColor: resolvedOptions.noColors, keysColor: 'blue', dashColor: 'magenta'})}\n` +
    '------------------------\n'
  );

  const { noColors } = resolvedOptions;

  const verboseArgs = resolvedOptions.verbose ? '--verbose' : '';
  const debugArgs = resolvedOptions.debug ? '--debug' : '';
  const regionArgs = resolvedOptions.region ? ['--region', resolvedOptions.region] : '';
  const awsProfileArgs = resolvedOptions.awsProfile
  ? ['--aws-profile', resolvedOptions.awsProfile]
  : '';
  const stageArgs = ['--stage', resolvedOptions.stage];
  


  const commandArgs = [
    'offline',
    'start',
    ...(stageArgs ? stageArgs : []),
    ...(regionArgs ? regionArgs : []),
    ...(awsProfileArgs ? awsProfileArgs : []),
    ...(debugArgs ? [debugArgs] : []),
    ...(verboseArgs ? [verboseArgs] : []),
    ...['--config', path.join(serviceDir, 'serverless.ts')]
  ];

  const command = `serverless offline start ${stageArgs} ${regionArgs} ${awsProfileArgs} ${verboseArgs} ${debugArgs} --config ${configurationPath}`; // Add --config flag


  if (!Array.isArray(config.plugins) || !config.plugins.includes('serverless-offline')) {
    logger.error('nx-serverless:offline-start cannot be run when \'serverless-offline\' plugin is not installed and defined in serverless.ts');
    return {
      success: false,
    }
  }

  const whitelistStderr = ['Running "serverless" from node_modules', 'Waiting for the debugger to disconnect']
  try {
    
    const slsOffline = await promisify(spawn)('serverless', commandArgs, { cwd: serviceDir, stdio: 'inherit' });
    logger.info('Code will never reach here');
    return { success: true };
  } catch (error) {
    const execError = error as ExecException & { stdout: string, stderr: string };
    logger.error(colorize(chalk.redBright, execError.message, noColors));
    logger.error(colorize(chalk.redBright, execError.stdout, noColors));
    return { success: false };
  }

  return {
    success: true,
  };
}
