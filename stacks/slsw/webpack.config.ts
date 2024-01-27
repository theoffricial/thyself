/* eslint-disable @typescript-eslint/no-explicit-any */
import { Configuration } from 'webpack';
import { workspaceRoot } from '@nx/devkit';
import serverlessWebpack from 'serverless-webpack';
import nodeExternals from 'webpack-node-externals';

import path from 'path';

export = (async () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const relativeProjectPath = path.relative(workspaceRoot, __dirname);
  /**
   * @link https://www.serverless.com/plugins/serverless-webpack#webpack-configuration-file
   */
  const config: Configuration = {
    /**
     * @link https://www.serverless.com/plugins/serverless-webpack#automatic-entry-resolution
     */
    entry: serverlessWebpack.lib.entries,
    // context: __dirname,
    target: 'node',
    output: {
      libraryTarget: 'commonjs',
      path: path.resolve(__dirname, '.webpack'),
      filename: '[name].js',
      sourceMapFilename: '[file].map',
      devtoolModuleFilenameTemplate: (info) => {
        // Check if the source file is your handler.ts
        if (info.absoluteResourcePath.includes(`${relativeProjectPath}/src`)) {
          // Modify the path as needed
          //   const relativePath = path.relative(__dirname, info.absoluteResourcePath);
          // Modify the path as needed
          const relativePath = path.relative(
            __dirname,
            info.absoluteResourcePath
          );
          return `webpack:///${relativeProjectPath}/${relativePath}`;
          //   return `webpack:///${info.absoluteResourcePath}`; //./${relativeProjectPath}/${relativePath}`;
        }

        // For other files, use the default path
        return `webpack:///${info.resourcePath}`;
      },
    },
    /**
     * @link https://www.serverless.com/plugins/serverless-webpack#output
     */
    externals: [nodeExternals()],
    plugins: [],
    /**
     * @link https://www.serverless.com/plugins/serverless-webpack#invocation-state
     */
    mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production',
    devtool: 'source-map',
    module: {
      rules: [
        // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.([cm]?ts|tsx)$/, loader: 'ts-loader' },
      ],
    },
    watch: serverlessWebpack.lib.webpack.isLocal,
    // output: {
    //     libraryTarget: 'commonjs',
    //     path: path.resolve(__dirname, '.webpack'),
    //     filename: '[name].js',
    //     sourceMapFilename: '[file].map',
    //     // sourceMapFilename: '[file].map',

    // },

    // new SourceMapDevToolPlugin({
    //     filename: '[file].map',
    //     publicPath: '',
    //     fileContext: 'public',
    //     module: true,

    //     moduleFilenameTemplate: (info: any) => {
    //         // Modify the source map file path here
    //         return info.absoluteResourcePath;
    //     },
    // }),

    // ],
    // loader: [],
    // optimization: {
    //     minimize: false,
    // },
    // resolve: {
    //     // Add `.ts` and `.tsx` as a resolvable extension.
    //     extensions: [".ts", ".tsx", ".js"],
    //     // Add support for TypeScripts fully qualified ESM imports.
    //     extensionAlias: {
    //      ".js": [".js", ".ts"],
    //      ".cjs": [".cjs", ".cts"],
    //      ".mjs": [".mjs", ".mts"]
    //     }
    // },
    // stats: {
    //     modules: false,
    // },
    // watch: true,
    // mode: serverlessWebpack.lib.webpack.isLocal ? 'development' : 'production'
  };

  return config;
})();
