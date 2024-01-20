import { InvokeLocalExecutorSchema } from './schema';
import executor from './executor';

const options: InvokeLocalExecutorSchema = {};

describe('InvokeLocal Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
