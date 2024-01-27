import type { PackageManager } from 'nx/src/utils/package-manager';

export interface ServiceGeneratorSchema {
  /**
   * Library name.
   * Pattern: (?:^@[a-zA-Z0-9-*~][a-zA-Z0-9-*._~]*\\/[a-zA-Z0-9-~][a-zA-Z0-9-._~]*|^[a-zA-Z][^:]*)$
   */
  name: string;
  description?: string;
  /** A directory where the lib is placed. */
  directory?: string;
  /** */
  packageManager?: PackageManager;
  /**
   * The bundler to use. 
   * Default: serverless-esbuild
   * Accepted values: serverless-esbuild, serverless-webpack, serverless-plugin-typescript
   */
  bundlerPlugin?: 'serverless-esbuild' | 'serverless-webpack' | 'serverless-plugin-typescript';
}
