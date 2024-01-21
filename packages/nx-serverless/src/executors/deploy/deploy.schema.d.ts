/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface DeployExecutor {
  /**
   * Current working directory
   */
  cwd?: string;
  /**
   * Turn off colors in CLI output
   */
  "no-colors"?: boolean;
  /**
   * Serverless configuration file name, Default: ts
   */
  "serverless-file-ext"?: "ts" | "js" | "yml" | "json";
  /**
   * region where the service should be deployed
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
  /**
   * Hide secrets from the output (e.g. API Gateway key values)
   */
  conceal?: boolean;
  /**
   * Forces a deployment to take place
   */
  force?: boolean;
  /**
   * Enables S3 Transfer Acceleration making uploading artifacts much faster
   */
  "aws-s3-accelerate"?: boolean;
  /**
   * Enforces new function version by overriding descriptions across all your functions. To be used only when migrating to new hashing algorithm.
   */
  "enforce-hash-update"?: boolean;
  /**
   * Minify the CloudFormation template
   */
  "minify-template"?: boolean;
  [k: string]: unknown;
}