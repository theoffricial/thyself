import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import { RollbackExecutor } from "./rollback.schema";

export interface RollbackExecutorSchema extends RollbackExecutor, BaseServerlessExecutorSchema {} // eslint-disable-line
