import type { Serverless } from 'serverless/aws';
import baseServerlessConfig from '../../serverless.base';

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfig,
  service: 'slses',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  package: {
    /**
     * This will switch the plugin to per function packaging.
     * The individual packaging needs more time at the packaging phase, but you'll get that paid back twice at runtime.
     */
    individually: true,
    include: [],
    exclude: [],
    patterns: [],
  },
  custom: {
    esbuild: {
      config: './esbuild.config.ts',
      bundle: true,
      keepOutputDirectory: false,
      outputBuildFolder: '.build',
      outputWorkFolder: '.esbuild',
      packager: 'npm',
      packagerOptions: {},
      watch: {
        pattern: ['src/**/*.ts'],
        ignore: ['.esbuild', 'dist', 'node_modules', '.build'],
      },
    },

    'serverless-offline': {
      noTimeout: true,
    },
  },
  functions: {
    hello: {
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
