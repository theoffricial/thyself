import { promisify } from 'util';
import { PrintExecutorSchema } from './schema';
// import path = require('path');
import { exec } from 'child_process';
import { logger } from '@nx/devkit';
// import path = require('path');
// import {Serverless } from 'serverless/aws';
export default async function runExecutor(options: PrintExecutorSchema) {
  console.log('Executor ran for Print', options);
  
  // const x: Serverless = {};

  // await import('node_modules/serverless/bin/serverless');

  const verbose = options.verbose ? '--verbose' : '';
  const debug = options.debug ? '--debug' : '';
  const region = options.region ? `--region ${options.region}` : '';
  const awsProfile = options.awsProfile ? `--aws-profile ${options.awsProfile}` : '';
  const stage = options.stage ? `--stage ${options.stage}` : '';

  
  let success = true;
  try {
    const { stdout, stderr } = await promisify(exec)(
      `./node_modules/.bin/serverless print ${stage} ${region} ${awsProfile} ${verbose} ${debug}`
      );
      
      if (stderr) {
        success = false;
        logger.error(stderr);
      }
      
      logger.log(stdout)
    } catch (error) {
      logger.error(error);
    }
      
      return {
        success,
      };
}
