import { PrintExecutorSchema } from './schema';
import executor from './executor';

const options: PrintExecutorSchema = {
  stage: 'dev',
};

describe('Print Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
