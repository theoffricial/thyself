import { BaseServerlessExecutorSchema } from "../../executors.shared-schema";
import {DeployExecutor} from './deploy.schema';

export interface DeployExecutorSchema extends DeployExecutor, BaseServerlessExecutorSchema {}
