import { ExecException, SpawnOptionsWithoutStdio, spawn } from "child_process";
import { logger } from "./logger";
import { ExitCodeType, exitCodeMap } from "./child-process.constants";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function childProcessExecution(args: string[], absoluteDirectoryPath: string, options: SpawnOptionsWithoutStdio & { noColors: boolean, tsNodeProject: string }) {
    return new Promise<string>((resolve, reject) => {

        try {
            const [serverlessCli, ...restOfArgs] = args;

            const childProcess = spawn(serverlessCli, restOfArgs, { 
                env: {
                    ...process.env,
                    // Important because serverless CLI uses ts-node to run the serverless.ts file
                    TS_NODE_PROJECT: options.tsNodeProject,
                }, 
              cwd: absoluteDirectoryPath, stdio: ['pipe', 'pipe', 'pipe'] 
            });

            childProcess.stdout.on('data', (data) => {
                const output = data.toString();
                logger.info(output);
            });
            childProcess.stdin.on('data', (data) => {
                const output = data.toString();
                logger.info(output);
            });
            childProcess.stderr.on('data', (data) => {
                const output: string = data.toString();
                const sanitizedOutput = output.trim();
                if (sanitizedOutput === '') {
                    return;
                } else if (sanitizedOutput || ['Debugger attached.', 'Running "serverless" from node_modules'].some(knownString => sanitizedOutput.includes(knownString))) {
                    logger.debug(sanitizedOutput);
                } else {
                    logger.error(sanitizedOutput);
                }
            });

            childProcess.on('exit', (code: ExitCodeType, signal: NodeJS.Signals) => {
                if (code !== null) {
                    if (code === 0) {
                        logger.debug(exitCodeMap.get(code).shortenUserFriendlyMessage);
                        resolve(exitCodeMap.get(code).shortenUserFriendlyMessage);
                    } else {
                        logger.debug(`Child process exited with error code ${code}`);
                        resolve(exitCodeMap.get(code).shortenUserFriendlyMessage);
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