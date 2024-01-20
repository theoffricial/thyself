import { RollbackFunctionExecutorSchema } from './schema';

export default async function runExecutor(
  options: RollbackFunctionExecutorSchema
) {
  console.log('Executor ran for RollbackFunction', options);
  return {
    success: true,
  };
}
