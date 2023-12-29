import { OfflineStartExecutorSchema } from './schema';
import executor from './executor';

const options: OfflineStartExecutorSchema = {};

describe('OfflineStart Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
