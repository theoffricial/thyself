import { PackageExecutorSchema } from './schema';
import executor from './executor';

const options: PackageExecutorSchema = {};

describe('Package Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
