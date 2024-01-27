import type { Serverless } from 'serverless/aws';
import baseServerlessConfig from '../../serverless.base';

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfig,
  service: 'esbuild-stack',
  plugins: [
    
    'serverless-esbuild',
    
    'serverless-offline'
  ],
  package: {
    individually: true,
    include: [],
    exclude: [],
    patterns: []
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
