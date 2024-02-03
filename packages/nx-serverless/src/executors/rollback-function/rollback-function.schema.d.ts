/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Name of the function
 */
export type Function = string;
/**
 * Version of the function
 */
export type FunctionVersion = string;

export interface RollbackFunctionExecutor {
  /**
   * Current working directory
   */
  cwd?: string;
  /**
   * Turn off colors in CLI output
   */
  "no-colors"?: boolean;
  /**
   * Serverless configuration file name, Default: serverless.ts
   */
  "serverless-file-ext"?: "ts" | "js" | "yml" | "json";
  /**
   * region where the stack should be deployed
   */
  region?: string;
  /**
   * AWS profile to use for deployment, Default: default
   */
  "aws-profile"?: string;
  /**
   * Serverless app name
   */
  app?: string;
  /**
   * Serverless organization name
   */
  org?: string;
  /**
   * Use local credentials instead of AWS_PROFILE
   */
  "use-local-credentials"?: boolean;
  /**
   * Path to serverless configuration file
   */
  config?: string;
  /**
   * Stage to deploy to
   */
  stage?: string;
  /**
   * Parameter to override in serverless configuration file
   */
  param?: string;
  /**
   * Shows this message and quits
   */
  help?: boolean;
  /**
   * Shows version information and quits
   */
  version?: boolean;
  /**
   * Shows verbose output
   */
  verbose?: boolean;
  /**
   * Shows debug output
   */
  debug?: boolean;
  function: Function;
  "function-version": FunctionVersion;
  [k: string]: unknown;
}
