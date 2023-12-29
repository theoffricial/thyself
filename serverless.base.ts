import { Serverless } from 'serverless/aws';

export const baseServerlessConfiguration: Partial<Serverless> = {
    provider: {
        'name': 'aws',
    },
    
}