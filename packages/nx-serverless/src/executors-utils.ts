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
    const awsProfileArgs = resolvedOptions['aws-profile'] ? ['--aws-profile', resolvedOptions['aws-profile']] : [];
    const appArgs = resolvedOptions.app ? ['--app', resolvedOptions.app] : [];
    const orgArgs = resolvedOptions.org ? ['--org', resolvedOptions.org] : [];
    const useLocalCredentialsArgs = resolvedOptions['use-local-credentials'] ? ['--useLocalCredentials'] : [];
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
        : getServerlessFile(resolvedOptions['serverless-file-ext'])
    ];
}

export function colorize(colorFn: chalk.Chalk, str: string, noColors: BaseServerlessExecutorSchema['no-colors']) { 
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
        `${prettyjson.render(commandArgs.join(' '), {noColor: baseOptions['no-colors'], keysColor: 'yellow', dashColor: 'yellow'})}\n` +
        '------------------------\n'
    );

    return commandArgs;
}

export function printInputOptions<T extends BaseServerlessExecutorSchema>(serverless: Serverless, options: T): void {
    const relativeConfigurationPath = path.join(options.cwd, options['serverless-file-ext']);
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
        `${prettyjson.render(serverlessStats, {noColor: options['no-colors'], keysColor: 'blue', dashColor: 'magenta'})}\n` +
        '------------------------\n'
      );

}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function executeCommandWithSpawn<T extends BaseServerlessExecutorSchema>(serverlessCommandArgs: string[], absoluteDirectoryPath: string, options?: SpawnOptionsWithoutStdio & { noColors: BaseServerlessExecutorSchema['no-colors'] }) {
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

    const _resolvedOptions: T & Required<BaseServerlessExecutorSchema> = {
        ...options,
        "aws-profile": options['aws-profile'] || 'default',
        config: options.config || '',
        "use-local-credentials": options['use-local-credentials'] || false,
        app: options.app || '',
        org: options.org || '',
        param: options.param || '',
        region: options.region || '',
        help: options.help || false,
        version: options.version || false,
        "no-colors": options['no-colors'] || false,
        stage: options.stage || 'dev',
        debug: options.debug || false,
        verbose: options.verbose || false,
        cwd: resolvedCwd,
        'serverless-file-ext': options['serverless-file-ext'] ?? 'ts',
    };

    return _resolvedOptions;    
}

import parseServerlessConfig from 'serverless/lib/configuration/read';

export async function getServerlessRuntime<T extends BaseServerlessExecutorSchema>(options: T) {
    const absoluteServiceDir = path.join(workspaceRoot, options.cwd);
  const serverlessFile = getServerlessFile(options['serverless-file-ext']);
  const configurationPath = path.join(absoluteServiceDir, serverlessFile);
  const serverlessConfig = (await parseServerlessConfig(configurationPath)) as Serverless;

  return serverlessConfig;
}

export function getServerlessFile(ext: BaseServerlessExecutorSchema['serverless-file-ext']): 'serverless.ts' | 'serverless.js' | 'serverless.yml' | 'serverless.json' {
    return `serverless.${ext}`;
}

export async function serverlessCommandRunner<ExecSchema extends BaseServerlessExecutorSchema>({
    options,
    context,
    subCommandArgs,
    customFlagsBuilder,
    customValidations
}: {
    /** 
     * The options passed to the executor
     */
    options: ExecSchema;
    /**
     * The context passed to the executor
     */
    context: ExecutorContext;
    /**
     * The sub command arguments to be passed to the serverless command
     * @example ['offline', 'start']
     */
    subCommandArgs: string[];
    /**
     * A function that runs a set of custom validations to ensure the command can be executed
     */
    customValidations?: (options: ExecSchema, serverless: Serverless) => void;
    /**
     * A function that returns an array of custom flags to be passed to the serverless command
     */
    customFlagsBuilder?: (options: ExecSchema) => string[];

}): Promise<{ success: boolean }> {
    const resolvedOptions = resolvedOptionsFn(options, context);

    const absoluteServiceDir = path.join(workspaceRoot, resolvedOptions.cwd);
    const configurationPath = path.join(absoluteServiceDir, getServerlessFile(resolvedOptions['serverless-file-ext']));
    const serverless = (await parseServerlessConfig(configurationPath)) as Serverless;

    printInputOptions(serverless, resolvedOptions);

    if (customValidations) {
        customValidations(resolvedOptions, serverless);
    }

    const customFlags: string[] = customFlagsBuilder ? customFlagsBuilder(resolvedOptions) : [];
    const commandArgs: string[] = buildServerlessCommandArgs(subCommandArgs, resolvedOptions, customFlags);
    const success = await executeCommandWithSpawn(commandArgs, absoluteServiceDir, { noColors: resolvedOptions['no-colors'] });

    return { success };
}