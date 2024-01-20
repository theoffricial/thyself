import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import { LogsExecutor } from "./logs.schema";

export interface LogsExecutorSchema extends LogsExecutor, BaseServerlessExecutorSchema {} // eslint-disable-line
