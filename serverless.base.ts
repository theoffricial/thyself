import { Serverless } from 'serverless/aws';

export const baseServerlessConfiguration: Partial<Serverless> = {
    frameworkVersion: '^3.38.0',
    provider: {
        name: 'aws',
        runtime: 'nodejs18.x',
        environment: {
            NODE_OPTIONS: "--enable-source-maps" // --[[ ✅ enabled lambda sourcemaps support ]]
        }
    },
    
}