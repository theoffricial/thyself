import { APIGatewayProxyHandler } from 'aws-lambda';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const hello: APIGatewayProxyHandler = async (event, _context) => {
  const statusCode = 202;
  return {
    statusCode,
    body: JSON.stringify(
      {
        statusCode,
        message:
          'Go Serverless esbuild (Typescript) v1.0! Your function executed successfully!',
        // input: event,
      },
      null,
      2
    ),
  };
};
