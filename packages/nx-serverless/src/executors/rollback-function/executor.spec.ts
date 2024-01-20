import { RollbackFunctionExecutorSchema } from './schema';
import executor from './executor';

const options: RollbackFunctionExecutorSchema = {};

describe('RollbackFunction Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
