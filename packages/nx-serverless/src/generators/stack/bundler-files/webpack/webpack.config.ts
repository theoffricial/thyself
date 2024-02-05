import { workspaceRoot } from '@nx/devkit';
import path from 'path';
import webpack, { Configuration } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import slsw from 'serverless-webpack';
import TerserPlugin from 'terser-webpack-plugin';
// If you need to copy a folder
// import CopyWebpackPlugin from 'copy-webpack-plugin';

const SOURCE_CODE_DIR_NAME = 'src';

const config = (async () => {
  const { entries, webpack: { isLocal } } = slsw.lib;
  // Only offline environment should have nvm installed with NVM_ environment variables
  const local = isLocal || Object.keys(process.env).filter(k => k.startsWith('NVM_')).length > 0;
  // Relative path to the project root
  const relativeProjectPath = path.relative(workspaceRoot, __dirname);
  // Path that indicates a file or folder is part of the source code
  const sourceCodePath = `${relativeProjectPath}/${SOURCE_CODE_DIR_NAME}`;

  // const relativeProjectPath = path.relative(workspaceRoot, __dirname);
  /**
   * @link https://www.serverless.com/plugins/serverless-webpack#webpack-configuration-file
   */
  const config: Configuration = {
    /**
     * @link https://www.serverless.com/plugins/serverless-webpack#automatic-entry-resolution
     */
    entry: entries,
    context: __dirname,
    target: 'node',
    node: false,
    mode: local ? 'development' : 'production',
    devtool: local ? 'eval-cheap-module-source-map' : 'source-map',
    stats: local ? 'detailed' : 'minimal',
    externalsPresets: { 
      node: true,
    },
    output: {
      libraryTarget: 'commonjs',
      filename: '[name].js',
      sourceMapFilename: '[file].map',
      path: path.join(__dirname, '.webpack'),
      ...(local && { 
        // Fix for source maps in serverless-webpack using nx
        devtoolModuleFilenameTemplate: (info) => {
          // Check if the source file is your handler.ts
          if (info.absoluteResourcePath.includes(sourceCodePath)) {
            // Modify the path to ensure webpack directs to the correct source files
            const relativePath = path.relative(
              __dirname,
              info.absoluteResourcePath
            );
            return `webpack:///${relativeProjectPath}/${relativePath}`;
          }
    
          // For dependencies and other files, use the default path.
          return `webpack:///${info.resourcePath}`;
        } 
      }),
    },
    /**
     * @link https://www.serverless.com/plugins/serverless-webpack#output
     */
    externals: [
      nodeExternals({
        modulesFromFile: {
          exclude: ['devDependencies'],
        },
      }),
    /** 
     * The AWS Lambda execution environment contains a number of libraries such as the AWS SDK for 
     * the Node.js and Python runtimes (a full list can be found here: Lambda runtimes).
     * @link https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html#function-code
     */
      'aws-sdk',
      '^@aws-sdk.*$'
    ],
    plugins: [
      local ? new webpack.HotModuleReplacementPlugin() : false,
      new webpack.AutomaticPrefetchPlugin(),
      // If you need to copy a folder/files
      // new CopyWebpackPlugin({
      //   patterns: [
      //     // { from: './my-folder', to: './to-folder' },
      //   ],
      // }),
    ],
    /**
     * @link https://www.serverless.com/plugins/serverless-webpack#invocation-state
     */
    // mode: isLocal ? 'development' : 'production',
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
        minify: TerserPlugin.terserMinify,
        extractComments: true,
        terserOptions: {
          compress: true,
          module: true,
          sourceMap: true,
        },
      })],
    },

    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: ['.ts', '.js'],
      // Add support for TypeScripts fully qualified ESM imports.
      extensionAlias: {
        '.js': ['.js', '.ts'],
        '.cjs': ['.cjs', '.cts'],
        '.mjs': ['.mjs', '.mts'],
      },
    },
    module: {
      rules: [
        // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
        { 
          test: /\.([cm]?ts)$/, 
          loader: 'ts-loader',
          options: { 
            transpileOnly: true,
          },
          exclude: [
            /node_modules/,
            /__mocks__/,
            /__tests__/,
            /.serverless/,
            // Weirdly, ignoring .webpack will cause the handler to not be found.
            // /.webpack/,
            /.webpackCache/,
            /.husky/,
            /.github/,
            /.jest/,
            /.vscode/,
          ]
        },
      ],
    },
    watch: local,
    watchOptions: { 
      ignored: /node_modules/,
    },
  };

  return config;
})();

export default config;