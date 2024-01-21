import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { InvokeExecutorSchema } from './schema';

export default async function runExecutor(options: InvokeExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['invoke'],
    customFlagsBuilder: (options: InvokeExecutorSchema) => {
      const flags: string[] = [];
      if (options.function) {
        flags.push('--function', options.function);
      }
      if (options.path) {
        flags.push('--path', options.path);
      }
      if (options.data) {
        flags.push('--data', options.data);
      }
      if (options.type) {
        flags.push('--type', options.type);
      }
      if (options.raw) {
        flags.push('--raw');
      }
      if (options.contextPath) {
        flags.push('--contextPath', options.contextPath);
      }
      if (options.context) {
        flags.push('--context', JSON.stringify(options.context));
      }
      if (options.log) {
        flags.push('--log');
      }
      if (options.qualifier) {
        flags.push('--qualifier', options.qualifier);
      }
      
      return flags;
    }
  });

  return result;
}
