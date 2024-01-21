import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import { RollbackFunctionExecutor } from "./rollback-function.schema";

export interface RollbackFunctionExecutorSchema extends RollbackFunctionExecutor, BaseServerlessExecutorSchema {}
