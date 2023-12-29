import type { Serverless } from 'serverless/aws';
import { baseServerlessConfiguration } from '../../serverless.base';

const serverlessConfiguration = <Serverless>{
  ...baseServerlessConfiguration,
  service: 'service-test',
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
