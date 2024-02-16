import type { BaseServerlessExecutorSchema } from './executors.shared-schema';
import { Serverless } from 'serverless/aws';
import path from 'path';
import { ExecutorContext, workspaceRoot } from '@nx/devkit';
import { loggerInit } from './logger';
import { printInputOptions, resolvedOptionsFn } from './nx-cli-options-parser';
import parseServerlessConfig from 'serverless/lib/configuration/read';
import { buildServerlessCommandArgs, getServerlessFile } from './serverless-cli-option-parser';
import { childProcessExecution } from './child-process';

export async function runServerless<ExecSchema extends BaseServerlessExecutorSchema>({
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
    loggerInit({ noColors: resolvedOptions['no-colors'] })

    const absoluteStackDir = path.join(workspaceRoot, resolvedOptions.cwd);
    const configurationPath = path.join(absoluteStackDir, getServerlessFile(resolvedOptions['serverless-file-ext']));
    const serverless = (await parseServerlessConfig(configurationPath)) as Serverless;

    printInputOptions(serverless, resolvedOptions);

    if (customValidations) {
        customValidations(resolvedOptions, serverless);
    }

    const customFlags: string[] = customFlagsBuilder ? customFlagsBuilder(resolvedOptions) : [];
    const commandArgs: string[] = buildServerlessCommandArgs(subCommandArgs, resolvedOptions, customFlags);
    const spawnResult = await childProcessExecution(commandArgs, absoluteStackDir, { noColors: Boolean(resolvedOptions['no-colors']) });

    return { success: !spawnResult.includes('error') };
}