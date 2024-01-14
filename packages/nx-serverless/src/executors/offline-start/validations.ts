import { Serverless } from "serverless/aws";
import { OfflineStartExecutorSchema } from "./schema";
import { logger } from "@nx/devkit";
import { ExecutorValidationError } from "../../executors-errors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function offlineStartValidations(serverless: Serverless, options: OfflineStartExecutorSchema) { 
    if (!Array.isArray(serverless.plugins) || !serverless.plugins.includes('serverless-offline')) {
        const message = 'nx-serverless:offline-start cannot be run when \'serverless-offline\' plugin is not installed and defined in serverless config file.';
        logger.error(message);
        throw new ExecutorValidationError(message)
    }
}