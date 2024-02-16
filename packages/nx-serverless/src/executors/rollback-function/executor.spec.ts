import { RollbackFunctionExecutorSchema } from './schema';
import executor from './executor';
import { logger, loggerInit } from '../../logger';
import { childProcessExecution } from '../../child-process';

jest.mock('serverless/lib/configuration/read');
jest.mock('../../child-process.ts');
jest.mock('../../logger.ts');

const mockedLogger = logger as jest.Mocked<typeof logger>;
const mockedLoggerInit = loggerInit as jest.MockedFunction<typeof loggerInit>;
const mockedChildProcessExecution = childProcessExecution as jest.MockedFunction<typeof childProcessExecution>;

describe('RollbackFunction Executor', () => {
  const options: RollbackFunctionExecutorSchema = {
    "function-version": "1",
    function: "test",
  };
  it('should success', async () => {
    mockedChildProcessExecution.mockResolvedValueOnce('success');
    const output = await executor(options, { cwd: process.cwd(),isVerbose: false, root: process.cwd(), projectName: 'test' });
    expect(output.success).toBe(true);
    expect(mockedLogger.debug).toHaveBeenCalledTimes(2)
    expect(mockedLogger.info).toHaveBeenCalledTimes(0)
    expect(mockedLogger.log).toHaveBeenCalledTimes(0)
    expect(mockedLogger.warn).toHaveBeenCalledTimes(0)
    expect(mockedLogger.error).toHaveBeenCalledTimes(0)
    expect(mockedLogger.fatal).toHaveBeenCalledTimes(0)
    expect(mockedLogger.verbose).toHaveBeenCalledTimes(0)
    expect(mockedLoggerInit).toHaveBeenCalledWith({ noColors: false })
  });

  it('should fail', async () => {
    mockedChildProcessExecution.mockResolvedValueOnce('error');
    const output = await executor(options, { cwd: process.cwd(),isVerbose: false, root: process.cwd(), projectName: 'test' });
    expect(output.success).toBe(false);
    expect(mockedLogger.debug).toHaveBeenCalledTimes(4)
    expect(mockedLogger.info).toHaveBeenCalledTimes(0)
    expect(mockedLogger.log).toHaveBeenCalledTimes(0)
    expect(mockedLogger.warn).toHaveBeenCalledTimes(0)
    expect(mockedLogger.error).toHaveBeenCalledTimes(0)
    expect(mockedLogger.fatal).toHaveBeenCalledTimes(0)
    expect(mockedLogger.verbose).toHaveBeenCalledTimes(0)
    expect(mockedLoggerInit).toHaveBeenCalledWith({ noColors: false })
  });
});
