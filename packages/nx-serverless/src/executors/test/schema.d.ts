import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import { TestExecutor } from "./test.schema";

export interface TestExecutorSchema extends TestExecutor, BaseServerlessExecutorSchema {}
