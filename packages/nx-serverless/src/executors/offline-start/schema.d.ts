import type { BaseServerlessExecutorSchema } from '../../executors.shared-schema';

export interface OfflineStartExecutorSchema extends BaseServerlessExecutorSchema {
  /** ALB port to listen on. Default: 3003. */
  albPort?: string;
  /** Used to build the Access-Control-Allow-Headers header for CORS support. */
  corsAllowHeaders?: string;
  /** Used to build the Access-Control-Allow-Origin header for CORS support. */
  corsAllowOrigin?: string;
  /** Used to override the Access-Control-Allow-Credentials default (which is true) to false. */
  corsDisallowCredentials?: boolean;
  /** Used to build the Access-Control-Exposed-Headers response header for CORS support. */
  corsExposedHeaders?: string;
  /** Used to disable cookie-validation on hapi.js-server. */
  disableCookieValidation?: boolean;
  /** The host name of Docker. Default: localhost. */
  dockerHost?: string;
  /** Defines service path which is used by SLS running inside Docker container. */
  dockerHostServicePath?: string;
  /** The network that the Docker container will connect to. */
  dockerNetwork?: string;
  /** Marks if the docker code layer should be read only. Default: true. */
  dockerReadOnly?: string;
  /** Enforce secure cookies. */
  enforceSecureCookies?: boolean;
  /** The host name to listen on. Default: localhost. */
  host?: string;
  /** HTTP port to listen on. Default: 3000. */
  httpPort?: string;
  /** To enable HTTPS, specify directory (relative to your cwd, typically your project dir) for both cert.pem and key.pem files. */
  httpsProtocol?: string;
  /** When using HttpApi with a JWT authorizer, don't check the signature of the JWT token. */
  ignoreJWTSignature?: boolean;
  /** Lambda http port to listen on. Default: 3002. */
  lambdaPort?: string;
  /** The directory layers should be stored in. Default: {codeDir}/.serverless-offline/layers. */
  layersDir?: string;
  /** Copy local environment variables. Default: false. */
  localEnvironment?: boolean;
  /** Turns off all authorizers. */
  noAuth?: boolean;
  /** Don't prepend http routes with the stage. */
  noPrependStageInUrl?: boolean;
  /** Disables the timeout feature. */
  noTimeout?: boolean;
  /** Adds a prefix to every path, to send your requests to http://localhost:3000/prefix/[your_path] instead. */
  prefix?: string;
  /** Reloads handler with each request. */
  reloadHandler?: boolean;
  /** Turns on loading of your HTTP proxy settings from serverless.yml. */
  resourceRoutes?: boolean;
  /** string of seconds until an idle function is eligible for termination. */
  terminateIdleLambdaTime?: boolean;
  /** Uses docker for node/python/ruby/provided. */
  useDocker?: boolean;
  /** Run handlers in the same process as 'serverless-offline'. */
  useInProcess?: boolean;
  /** Set WebSocket hard timeout in seconds to reproduce AWS limits (https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html#apigateway-execution-service-websocket-limits-table). Default: 7200 (2 hours). */
  webSocketHardTimeout?: string;
  /** Set WebSocket idle timeout in seconds to reproduce AWS limits (https://docs.aws.amazon.com/apigateway/latest/developerguide/limits.html#apigateway-execution-service-websocket-limits-table). Default: 600 (10 minutes). */
  webSocketIdleTimeout?: string;
  /** Websocket port to listen on. Default: 3001. */
  websocketPort?: string;
}