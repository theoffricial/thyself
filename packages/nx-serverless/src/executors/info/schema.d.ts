import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import { InfoExecutor } from "./info.schema";

export interface InfoExecutorSchema extends InfoExecutor, BaseServerlessExecutorSchema {} // eslint-disable-line
