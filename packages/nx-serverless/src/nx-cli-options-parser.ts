import { ExecutorContext, workspaceLayout } from "@nx/devkit";
import path from "path";
import { BaseServerlessExecutorSchema } from "./executors.shared-schema";
import { cleanEmptyValues } from "clean-empty-values";
import prettyjson from 'prettyjson';
import { logger } from "./logger";
import { Serverless } from "serverless/aws";

export function resolvedOptionsFn<T extends BaseServerlessExecutorSchema, C extends ExecutorContext>(options: T, context: C) {
    const { appsDir } = workspaceLayout();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    // const { _, ...restOptions } = options as T;
    const resolvedCwd = options.cwd || (path.join(appsDir, context.projectName));

    const _resolvedOptions: T & BaseServerlessExecutorSchema = {
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

export function printInputOptions<T extends BaseServerlessExecutorSchema>(serverless: Serverless, options: T): void {
    const relativeConfigurationPath = path.join(options.cwd, options['serverless-file-ext']);
    const serverlessStats = cleanEmptyValues({
        ...options,
        service: serverless.service,
        layers: serverless.layers,
        frameworkVersion: serverless.frameworkVersion,
        config: relativeConfigurationPath,
        runtime: serverless.provider.runtime,
      }, {cleanInPlace: true,nullCleaner: true, emptyStrings: true})
    
      const message =
      '\nNX resolved options:\n' + 
      '------------------------\n' + 
      `${prettyjson.render(serverlessStats, {noColor: options['no-colors'] })}\n` +//, keysColor: 'blue', dashColor: 'magenta'})}\n` +
      '------------------------\n'
      logger.debug(message);

}
