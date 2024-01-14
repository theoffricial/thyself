import chalk from 'chalk';
import type {BaseServerlessExecutorSchema} from './executors.shared-schema';
import stripAnsi from 'strip-ansi';
import { Serverless } from 'serverless/aws';
import path from 'path';
import { ExecutorContext, logger, workspaceLayout, workspaceRoot } from '@nx/devkit';
import prettyjson from 'prettyjson';
import { ExecException, SpawnOptionsWithoutStdio, spawn } from 'child_process';
import { promisify } from 'util';

export function getSharedServerlessOptionsArgs<T extends BaseServerlessExecutorSchema>(resolvedOptions: T): string[] {
    const regionArgs = resolvedOptions.region ? ['--region', resolvedOptions.region] : [];
    const awsProfileArgs = resolvedOptions.awsProfile ? ['--aws-profile', resolvedOptions.awsProfile] : [];
    const appArgs = resolvedOptions.app ? ['--app', resolvedOptions.app] : [];
    const orgArgs = resolvedOptions.org ? ['--org', resolvedOptions.org] : [];
    const useLocalCredentialsArgs = resolvedOptions.useLocalCredentials ? ['--useLocalCredentials'] : [];
    // const configArgs = getServerlessConfigFilePathArgs(resolvedOptions);
    const stageArgs = ['--stage', resolvedOptions.stage];
    const paramArgs = resolvedOptions.param ? ['--param', resolvedOptions.param] : [];
    const verboseArgs = resolvedOptions.verbose ? ['--verbose'] : [];
    const debugArgs = resolvedOptions.debug ? ['--debug', '*'] : [];
    return [
        ...regionArgs,
        ...awsProfileArgs,
        ...appArgs,
        ...orgArgs,
        ...useLocalCredentialsArgs,
        // ...configArgs,
        ...stageArgs,
        ...paramArgs,
        ...verboseArgs,
        ...debugArgs,
    ]
}

export function getServerlessConfigFilePathArgs<T extends BaseServerlessExecutorSchema>(resolvedOptions: T): string[] {
    return [
        '--config', 
        resolvedOptions.config 
        ? resolvedOptions.config 
        : resolvedOptions.serverlessConfigurationFileName
    ];
}

export function colorize(colorFn: chalk.Chalk, str: string, noColors: BaseServerlessExecutorSchema['noColors']) { 
    return noColors ? stripAnsi(str) : colorFn(str) 
};

export function buildServerlessCommandArgs(subCommandArgs: string[], baseOptions: BaseServerlessExecutorSchema, customFlags: string[]) {
  const configArgs = getServerlessConfigFilePathArgs(baseOptions);
    const commandArgs: string[] = [
        'serverless',
        ...subCommandArgs,
        ...configArgs,
    ];

    if (baseOptions.help) {
        commandArgs.push('--help');
    } else if (baseOptions.version) {
        commandArgs.push('--version');
    } else {
        commandArgs.push(...customFlags);
        commandArgs.push(...getSharedServerlessOptionsArgs(baseOptions))
    }

    logger.debug(
        'Executing:\n' +
        `${prettyjson.render(commandArgs.join(' '), {noColor: baseOptions.noColors, keysColor: 'yellow', dashColor: 'yellow'})}\n` +
        '------------------------\n'
    );

    return commandArgs;
}

export function printInputOptions<T extends BaseServerlessExecutorSchema>(serverless: Serverless, options: T): void {
    const relativeConfigurationPath = path.join(options.cwd, options.serverlessConfigurationFileName);
    const serverlessStats = {
        ...options,
        service: serverless.service,
        layers: serverless.layers,
        frameworkVersion: serverless.frameworkVersion,
        config: relativeConfigurationPath,
        runtime: serverless.provider.runtime,
      }
    
      logger.debug(
        '------------------------\n' + 
        'serverless offline start options:\n' + 
        '------------------------\n' + 
        `${prettyjson.render(serverlessStats, {noColor: options.noColors, keysColor: 'blue', dashColor: 'magenta'})}\n` +
        '------------------------\n'
      );

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function executeCommandWithSpawn<T extends BaseServerlessExecutorSchema>(serverlessCommandArgs: string[], absoluteDirectoryPath: string, options?: SpawnOptionsWithoutStdio & { noColors: BaseServerlessExecutorSchema['noColors'] }) {
    try {
        const [serverlessCli, ...restOfArgs] = serverlessCommandArgs;
        await promisify(spawn)(serverlessCli, restOfArgs, { cwd: absoluteDirectoryPath, stdio: 'inherit', detached: true });
        logger.debug('The execution should never reach here....');

        return true;
    } catch (error) {
        const execError = error as ExecException & { stdout: string, stderr: string };
        logger.error(colorize(chalk.redBright, execError.message, options.noColors));
        logger.error(colorize(chalk.redBright, execError.stdout, options.noColors));
        return false;
    }
}

export function resolvedOptionsFn<T extends BaseServerlessExecutorSchema, C extends ExecutorContext>(options: T, context: C) {
    const { appsDir } = workspaceLayout();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    // const { _, ...restOptions } = options as T;
    const resolvedCwd = options.cwd || (path.join(appsDir, context.projectName));

    const _resolvedOptions: Required<Pick<T, 'cwd'>> & Omit<T, 'cwd'> = {
        ...options,
        stage: options.stage || 'dev',
        debug: options.debug || false,
        verbose: options.verbose || false,
        cwd: resolvedCwd,
        serverlessConfigurationFileName: options.serverlessConfigurationFileName,
    };

    return _resolvedOptions;    
}

import parseServerlessConfig from 'serverless/lib/configuration/read';

export async function getServerlessRuntime<T extends BaseServerlessExecutorSchema>(options: T) {
    const absoluteServiceDir = path.join(workspaceRoot, options.cwd);
  // const relativeConfigurationPath = path.join(resolvedCwd, resolvedOptions.serverlessConfigurationFileName);
  const configurationPath = path.join(absoluteServiceDir, options.serverlessConfigurationFileName);
  const serverlessConfig = (await parseServerlessConfig(configurationPath)) as Serverless;

  return serverlessConfig;
}