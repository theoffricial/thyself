import type { Serverless } from 'serverless/aws';
import baseServerlessConfig from '../../serverless.base';

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfig,
  service: 'webpack-stack',
  plugins: ['serverless-esbuild', 'serverless-offline'],
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
