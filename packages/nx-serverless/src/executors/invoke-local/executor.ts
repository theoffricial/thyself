import { InvokeLocalExecutorSchema } from './schema';

export default async function runExecutor(options: InvokeLocalExecutorSchema) {
  console.log('Executor ran for InvokeLocal', options);
  return {
    success: true,
  };
}
