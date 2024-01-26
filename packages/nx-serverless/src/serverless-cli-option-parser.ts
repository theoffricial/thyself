import { BaseServerlessExecutorSchema } from "./executors.shared-schema";
import prettyjson from 'prettyjson';
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
  
      const printMessage = 'Executing:\n' +
      `${prettyjson.render(commandArgs.join(' '), {noColor: baseOptions['no-colors'], keysColor: 'yellow', dashColor: 'yellow'})}\n` +
      '------------------------\n';
      logger.debug(printMessage);
      return commandArgs;
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