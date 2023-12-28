import { promisify } from 'util';
import { EchoExecutorSchema } from './schema';
import { exec } from 'child_process';

export default async function runExecutor(options: EchoExecutorSchema) {
  console.info(`Executing "echo"...`);
  console.info(`Options: ${JSON.stringify(options, null, 2)}`);

  const { stdout, stderr } = await promisify(exec)(
    `echo ${options.textToEcho}`
  );

  console.log(stdout);
  console.error(stderr);

  const success = !stderr;
  return { success };
}
