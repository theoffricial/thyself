import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import { InvokeLocalExecutor } from "./invoke-local.schema";

export interface InvokeLocalExecutorSchema extends InvokeLocalExecutor, BaseServerlessExecutorSchema {} // eslint-disable-line
