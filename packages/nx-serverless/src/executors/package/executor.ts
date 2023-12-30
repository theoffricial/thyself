import { PackageExecutorSchema } from './schema';

export default async function runExecutor(options: PackageExecutorSchema) {
  console.log('Executor ran for Package', options);
  return {
    success: true,
  };
}
