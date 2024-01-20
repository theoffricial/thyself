import { LogsExecutorSchema } from './schema';
import executor from './executor';

const options: LogsExecutorSchema = {};

describe('Logs Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
