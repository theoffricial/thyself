import type { Serverless } from 'serverless/aws';
import {} from '@nx/devkit';
import baseServerlessConfiguration from '../../serverless.base';

type OriginalOrStringInterpolation<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? OriginalOrStringInterpolation<U>[]
    : T[P] extends object
    ? OriginalOrStringInterpolation<T[P]> | string
    : T[P] | string;
};

const serverlessConfiguration = <OriginalOrStringInterpolation<Serverless>>{
  ...baseServerlessConfiguration,
  service: 'my-service',
  plugins: ['serverless-webpack', 'serverless-offline'],
  custom: {
    webpack: {
      watch: true, // # Run webpack in watch mode
      webpackConfig: 'webpack.config.ts', // # Name of webpack configuration file
      includeModules: true, // # Node modules configuration for packaging
      packager: 'pnpm', // # Packager that will be used to package your external modules
      excludeFiles: 'src/**/*.test.js', // # Provide a glob for files to ignore
      keepOutputDirectory: false,
      // keepOutputDirectory: true, // # Whether or not to keep the output directory
    },
    'serverless-offline': {
      // allowCache: true,
      noTimeout: true,
      /**
       * @link https://github.com/dherault/serverless-offline/issues/931#issuecomment-1291164404
       */
      reloadHandler: true,
      // useChildProcesses: true,
    },
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
