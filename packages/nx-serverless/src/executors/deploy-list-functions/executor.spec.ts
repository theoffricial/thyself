import { DeployListFunctionsExecutorSchema } from './schema';
import executor from './executor';

const options: DeployListFunctionsExecutorSchema = {};

describe('DeployListFunctions Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
