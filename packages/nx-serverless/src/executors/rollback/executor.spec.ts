import { RollbackExecutorSchema } from './schema';
import executor from './executor';

const options: RollbackExecutorSchema = {};

describe('Rollback Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
