import { BaseServerlessExecutorSchema } from "./executors.shared-schema";
import * as prettyjson from 'prettyjson';
import { logger } from "./logger";

export function getServerlessFile(ext: BaseServerlessExecutorSchema['serverless-file-ext']): 'serverless.ts' | 'serverless.js' | 'serverless.yml' | 'serverless.json' {
    return `serverless.${ext}`;
}

export function getServerlessConfigFilePathArgs<T extends BaseServerlessExecutorSchema>(resolvedOptions: T): string[] {
    return [
        '--config', 
        resolvedOptions.config 
        ? resolvedOptions.config 
        : getServerlessFile(resolvedOptions['serverless-file-ext'])
    ];
}

export function buildServerlessCommandArgs(serverlessArgs: string[], baseOptions: BaseServerlessExecutorSchema, customFlags: string[]) {
    const configArgs = getServerlessConfigFilePathArgs(baseOptions);
    const commandArgs: string[] = [
          'serverless',
          ...serverlessArgs,
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

    printServerlessCommandArgs(commandArgs, baseOptions);

    return commandArgs;
  }

  export function printServerlessCommandArgs(serverlessArgs: string[], baseOptions: BaseServerlessExecutorSchema) {
    const prettyCommand = prettyjson.render(serverlessArgs.join(' '), { noColor: baseOptions['no-colors'] });
    const printMessage =
        '\nServerless command:\n' +
        '------------------------\n' +
        prettyCommand + 
        '\n------------------------';

    logger.debug(printMessage);
  }

  export function getSharedServerlessOptionsArgs<T extends BaseServerlessExecutorSchema>(resolvedOptions: T): string[] {
    const flags: string[] = [];
    if (resolvedOptions['region']) {
        flags.push('--region', resolvedOptions['region']);
    }
    if (resolvedOptions['aws-profile']) {
        flags.push('--aws-profile', resolvedOptions['aws-profile']);
    }
    if (resolvedOptions['app']) {
        flags.push('--app', resolvedOptions['app']);
    }
    if (resolvedOptions['org']) {
        flags.push('--org', resolvedOptions['org']);
    }
    if (resolvedOptions['use-local-credentials']) {
        flags.push('--use-local-credentials');
    }
    if (resolvedOptions['config']) {
        flags.push('--config', resolvedOptions['config']);
    }
    if (resolvedOptions['stage']) {
        flags.push('--stage', resolvedOptions['stage']);
    }
    if (resolvedOptions['param']) {
        flags.push('--param', resolvedOptions['param']);
    }
    if (resolvedOptions['verbose']) {
        flags.push('--verbose');
    }
    if (resolvedOptions['debug']) {
        flags.push('--debug', '*');
    }
    return flags
}