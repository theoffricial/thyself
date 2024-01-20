import { RollbackExecutorSchema } from './schema';

export default async function runExecutor(options: RollbackExecutorSchema) {
  console.log('Executor ran for Rollback', options);
  return {
    success: true,
  };
}
