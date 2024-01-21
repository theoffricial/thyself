import { ExecutorContext } from '@nx/devkit';
import { serverlessCommandRunner } from '../../executors-utils';
import { InvokeLocalExecutorSchema } from './schema';

export default async function runExecutor(options: InvokeLocalExecutorSchema, context: ExecutorContext) {
  const result = await serverlessCommandRunner({
    options,
    context,
    subCommandArgs: ['invoke', 'local'],
    customFlagsBuilder: (options: InvokeLocalExecutorSchema) => {
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
      if (options.env) {
        flags.push('--env', options.env);
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
      if (options.docker) {
        flags.push('--docker');
      }
      if (options['docker-arg']) {
        flags.push('--docker-arg', options['docker-arg']);
      }
      
      return flags;
    }
  });

  return result;
}
