import type { Serverless } from 'serverless/aws';
import baseServerlessConfiguration from '../../serverless.base';
import type {WatchOptions } from 'chokidar';
const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfiguration,
  service: 'service-test',
  plugins: [
    // 'src/custom-serverless-esbuild',
    'serverless-esbuild',
    'serverless-offline',
  ],
  custom: {
    'serverless-offline': {
      noTimeout: true,
      // useChildProcesses: true,
      // useInProcess: true,
      debug: true,
      // useWorkerThreads: true,
      // reloadHandler: true,
      // reloadHandler: true,
      // reloadHandler: true,ser
    },
    esbuild: {
      config: './esbuild.config.ts',
      // sourcemap: true, // --[[ ✅ enabled esbuild sourcemaps generation ]]
      // sourcemap: "linked",
      bundle: true,
      // minify: false,
      // keepNames: true,
      // target: 'node18',
      // platform: 'node',
      keepOutputDirectory: false,
      outputBuildFolder: '.build',
      outputWorkFolder: '.esbuild',
      packager: 'pnpm',
      packagerOptions: {},
      watch: {
        pattern: ['src/**/*.ts'],
        ignore: ['.esbuild', 'dist', 'node_modules', '.build'],
        chokidar: { ignoreInitial: true, usePolling: true, useFsEvents: true, } as WatchOptions,
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
