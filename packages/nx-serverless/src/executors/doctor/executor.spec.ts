import { DoctorExecutorSchema } from './schema';
import executor from './executor';

const options: DoctorExecutorSchema = {};

describe('Doctor Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
