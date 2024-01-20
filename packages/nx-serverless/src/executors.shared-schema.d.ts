/**
 * Shared schema for all serverless CLI commands
 */
export interface BaseServerlessExecutorSchema {
  /** The relative path where the command is being executed */
  cwd?: string;
  /** When set to true, Strip ANSI characters, helpful for troubleshooting, Default: false */
  'no-colors'?: boolean;
  /** Define what Serverless Framework Configuration file used, Default: serverless.ts */
  'serverless-file-ext'?:
    | 'ts'
    | 'js'
    | 'yml'
    | 'json';

  /** Region of the service */
  region?: string;
  /** AWS profile to use with the command */
  'aws-profile'?: string;
  /** Dashboard app */
  app?: string;
  /** Dashboard org */
  org?: string;
  /** Rely on locally resolved AWS credentials instead of loading them from Serverless Framework Providers. This applies only to services signed into the Dashboard. */
  'use-local-credentials'?: boolean;
  /** Path to serverless config file */
  config?: string;
  /** Stage of the service */
  stage?: string;
  /** Pass custom parameter values for "param" variable source (usage: --param="key=value") */
  param?: string;
  /** Show this message */
  help?: boolean;
  /** Show version info */
  version?: boolean;
  /** Show verbose logs */
  verbose?: boolean;
  /** Namespace of debug logs to expose (use "*" to display all) */
  debug?: boolean;
}
