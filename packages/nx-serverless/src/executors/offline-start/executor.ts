import { ExecutorContext, logger, workspaceRoot } from '@nx/devkit';
import { OfflineStartExecutorSchema } from './schema';
import prettyjson from 'prettyjson';
// import path from 'path';

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

  logger.debug(
    'serverless print options\n' + 
    '------------------------\n' + 
    `${prettyjson.render(resolvedOptions, {noColor: resolvedOptions.noColors, keysColor: 'blue', dashColor: 'magenta'})}\n` +
    '------------------------\n'
  );

  // const { noColors } = resolvedOptions;

  // const verboseArgs = resolvedOptions.verbose ? '--verbose' : '';
  // const debugArgs = resolvedOptions.debug ? '--debug' : '';
  // const regionArgs = resolvedOptions.region ? `--region ${resolvedOptions.region}` : '';
  // const awsProfileArgs = resolvedOptions.awsProfile
  //   ? `--aws-profile ${resolvedOptions.awsProfile}`
  //   : '';
  // const stageArgs = `--stage ${resolvedOptions.stage}`;

  // const serviceDir = path.join(workspaceRoot, 'stacks', context.projectName); // Get service directory from options

  // const command = `serverless offline start ${stageArgs} ${regionArgs} ${awsProfileArgs} ${verboseArgs} ${debugArgs} --config ${path.join(serviceDir, 'serverless.ts')}`; // Add --config flag

  return {
    success: true,
  };
}
