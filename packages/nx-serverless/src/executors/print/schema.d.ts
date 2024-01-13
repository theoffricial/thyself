import type {BaseServerlessExecutorSchema} from '../../executors.shared-schema';

export interface PrintExecutorSchema extends BaseServerlessExecutorSchema {
    /** Print configuration in given format ("yaml", "json", "text"). Default: yaml */
    format?: 'yaml' | 'json' | 'text';
    /** Optional period-separated path to print a sub-value (eg: "provider.name") */
    path?: string;
    /** Optional transform-function to apply to the value ("keys") */
    transform?: string;
}
