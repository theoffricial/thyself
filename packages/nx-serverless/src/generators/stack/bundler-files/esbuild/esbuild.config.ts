import Serverless from 'serverless';
import type { BuildOptions } from 'esbuild';

export = (serverless: Serverless): BuildOptions => {
  const local = serverless.service.provider.stage === 'local' 
    // Only offline environment should have nvm installed with NVM_ environment variables
    || Object.keys(process.env).filter(k => k.startsWith('NVM_')).length > 0;

  return {
    /** Documentation: https://esbuild.github.io/api/#bundle */
    bundle: true,
    /** Documentation: https://esbuild.github.io/api/#target */
    target: 'node18',
    /** Documentation: https://esbuild.github.io/api/#platform */
    platform: 'node',
    /** Documentation: https://esbuild.github.io/api/#format */
    format: 'cjs',
    /** Documentation: https://esbuild.github.io/api/#keep-names */
    keepNames: local,
    /** Documentation: https://esbuild.github.io/api/#sourcemap */
    sourcemap: local ? 'both' : true,
    /** 
     * Documentation: https://esbuild.github.io/api/#external 
     * The AWS Lambda execution environment contains a number of libraries such as the AWS SDK for 
     * the Node.js and Python runtimes (a full list can be found here: Lambda runtimes).
     * @link https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-code
     * */
    external: ['@aws-sdk/*'],
    /** Documentation: https://esbuild.github.io/plugins/ */
    plugins: [],
    /** Documentation: https://esbuild.github.io/api/#color */
    color: true,
    /** Documentation: https://esbuild.github.io/api/#sources-content */
    sourcesContent: local,
  };
}