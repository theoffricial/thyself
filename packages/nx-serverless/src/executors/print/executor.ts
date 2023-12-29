// import { promisify } from 'util';
import { promisify } from 'util';
import { PrintExecutorSchema } from './schema';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import { ExecutorContext, logger, workspaceRoot
} from '@nx/devkit';
import { ExecException, exec } from 'child_process';
import path from 'path';
import prettyjson from 'prettyjson';

const colorize = (chalkColorFn: chalk.Chalk, s: string, noColors: PrintExecutorSchema['noColors']) => noColors ? stripAnsi(s) : chalkColorFn(s);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function runExecutor(options: PrintExecutorSchema, context: ExecutorContext) {
  
  const resolvedOptions: PrintExecutorSchema = {
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

  const { noColors } = resolvedOptions;

  const verboseArgs = resolvedOptions.verbose ? '--verbose' : '';
  const debugArgs = resolvedOptions.debug ? '--debug' : '';
  const regionArgs = resolvedOptions.region ? `--region ${resolvedOptions.region}` : '';
  const awsProfileArgs = resolvedOptions.awsProfile
    ? `--aws-profile ${resolvedOptions.awsProfile}`
    : '';
  const stageArgs = `--stage ${resolvedOptions.stage}`;

  const serviceDir = path.join(workspaceRoot, 'stacks', context.projectName); // Get service directory from options

  const command = `serverless print ${stageArgs} ${regionArgs} ${awsProfileArgs} ${verboseArgs} ${debugArgs} --config ${path.join(serviceDir, 'serverless.ts')}`; // Add --config flag

  logger.log(colorize(chalk.yellowBright, `cwd: ${serviceDir}`, noColors));
  logger.log(colorize(chalk.yellowBright, command, noColors));

  const whitelistStderr = ['Running "serverless" from node_modules', 'Waiting for the debugger to disconnect']
  try {
    const { stdout, stderr } = await promisify(exec)(
      command,
      { cwd: serviceDir } // Execute from workspace root
    );

    if (whitelistStderr.some(w => stderr.includes(w))) {
      logger.info(colorize(chalk.blue, stderr, noColors));
    } else if (stderr) {
      // logger.error(chalk.redBright(stderr));
      logger.error(colorize(chalk.redBright, stderr, noColors));
      // logger.error(chalk.redBright(stdout));
      logger.error(colorize(chalk.redBright,stdout,noColors));
      return { success: false };
    }

    logger.log(colorize(chalk.greenBright,stdout, noColors));
    return { success: true };
  } catch (error) {
    const execError = error as ExecException & { stdout: string, stderr: string };
    logger.error(colorize(chalk.redBright, execError.message, noColors));
    logger.error(colorize(chalk.redBright, execError.stdout, noColors));
    return { success: false };
  }
}
