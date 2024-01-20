import type {BaseServerlessExecutorSchema} from '../../executors.shared-schema';
import { PackageExecutor } from './package.schema';

export interface PackageExecutorSchema extends PackageExecutor, BaseServerlessExecutorSchema {
}
