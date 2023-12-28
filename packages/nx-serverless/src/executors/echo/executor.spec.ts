import { EchoExecutorSchema } from './schema';
import executor from './executor';

const options: EchoExecutorSchema = {};

describe('Echo Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
