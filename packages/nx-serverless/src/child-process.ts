import { ExecException, SpawnOptionsWithoutStdio, spawn } from "child_process";
import { logger } from "./logger";
import { ExitCodeType, exitCodeMap } from "./executors.constants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function childProcessExecution(serverlessCommandArgs: string[], absoluteDirectoryPath: string, options?: SpawnOptionsWithoutStdio & { noColors: boolean }) {
    return new Promise<string>((resolve, reject) => {

        try {
            const [serverlessCli, ...restOfArgs] = serverlessCommandArgs;

            const childProcess = spawn(serverlessCli, restOfArgs, { cwd: absoluteDirectoryPath, stdio: ['pipe', 'pipe', 'pipe'] });

            childProcess.stdout.on('data', (data) => {
                const output = data.toString();
                logger.info(output);
            });
            childProcess.stdin.on('data', (data) => {
                const output = data.toString();
                logger.info(output);
            });
            childProcess.stderr.on('data', (data) => {
                const output = data.toString();
                logger.error(output);
            });

            childProcess.on('exit', (code: ExitCodeType, signal: NodeJS.Signals) => {
                if (code !== null) {
                    if (code === 0) {
                        logger.debug(exitCodeMap.get(code).shortenUserFriendly);
                        resolve(exitCodeMap.get(code).shortenUserFriendly);
                    } else {
                        logger.debug(`Child process exited with error code ${code}`);
                        resolve(exitCodeMap.get(code).shortenUserFriendly);
                    }
                } else if (signal !== null) {
                    logger.debug(`Child process was killed with signal ${signal}`);
                    resolve(`The process was killed intentionally with signal ${signal}`);
                }
            });
        } catch (error) {
            const execError = error as ExecException & { stdout: string, stderr: string };
            logger.error(execError.message);
            logger.error(execError.stdout);
            reject(new Error(`The process killed due to error ${execError.message}`));
        }
    });
}