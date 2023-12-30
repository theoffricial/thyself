import type { Serverless } from 'serverless/aws';
import { baseServerlessConfiguration } from '../../serverless.base';

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfiguration,
  service: 'service-test',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
  ],
  custom: {
    'serverless-offline': {
      noTimeout: true,
    },
    esbuild: {
      config: './esbuild.config.ts',
      sourcemap: true, // --[[ ✅ enabled esbuild sourcemaps generation ]]
      bundle: true,
      target: 'node18',
      platform: 'node',
      keepOutputDirectory: false,
      outputBuildFolder: '.build',
      outputWorkFolder: '.esbuild',
      packager: 'pnpm',
      packagerOptions: {},
      watch: {
        pattern: ['src/**/*.ts'],
        ignore: ['.esbuild', 'dist', 'node_modules', '.build'],
        chokidar: { ignoreInitial: true },
      }
    }
  },
  functions: {
    hello: {
      /** 
       * @link file://./src/handler.ts
      */
      handler: 'src/handler.hello', 
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
