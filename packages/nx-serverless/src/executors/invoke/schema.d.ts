import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import { InvokeExecutor } from "./invoke.schema";

export interface InvokeExecutorSchema extends InvokeExecutor, BaseServerlessExecutorSchema {} // eslint-disable-line
