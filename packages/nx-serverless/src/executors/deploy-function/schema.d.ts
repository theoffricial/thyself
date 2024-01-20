import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import { DeployFunctionExecutor } from "./deploy-function.schema";

export interface DeployFunctionExecutorSchema extends DeployFunctionExecutor, BaseServerlessExecutorSchema {} // eslint-disable-line
