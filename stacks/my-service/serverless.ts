import type { Serverless } from 'serverless/aws';
import { baseServerlessConfiguration } from '../../serverless.base';

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfiguration,
  service: 'my-service',
  plugins: [
    'serverless-webpack',
    'serverless-offline'
  ],
  custom: {
    webpack: {
      webpackConfig: 'webpack.config.ts', // # Name of webpack configuration file
      includeModules: true, // # Node modules configuration for packaging
      packager: 'pnpm', // # Packager that will be used to package your external modules
      excludeFiles: 'src/**/*.test.js', // # Provide a glob for files to ignore
      // keepOutputDirectory: true, // # Whether or not to keep the output directory
    },
    'serverless-offline': {
      noTimeout: true,
      useChildProcesses: true,
      reloadHandler: true,
    }
  },
  functions: {
    hello: {
      handler: './src/handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          },
        },
      ],
    },
  },
};

export = serverlessConfiguration;
