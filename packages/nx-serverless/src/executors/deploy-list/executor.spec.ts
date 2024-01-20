import { DeployListExecutorSchema } from './schema';
import executor from './executor';

const options: DeployListExecutorSchema = {};

describe('DeployList Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
