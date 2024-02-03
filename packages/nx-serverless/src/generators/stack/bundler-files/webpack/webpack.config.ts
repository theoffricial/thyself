// import { Configuration } from 'webpack';
import { workspaceRoot } from '@nx/devkit';
// // import serverlessWebpack from 'serverless-webpack';
// // import nodeExternals from 'webpack-node-externals';
// // import path from 'path';

// const x = (async () => {
//   // const isLocal = serverlessWebpack.lib.webpack.isLocal;
//   // const entries = serverlessWebpack.lib.entries;

//   // const relativeProjectPath = path.relative(workspaceRoot, __dirname);
//   /**
//    * @link https://www.serverless.com/plugins/serverless-webpack#webpack-configuration-file
//    */
//   const config: Configuration = {
//     /**
//      * @link https://www.serverless.com/plugins/serverless-webpack#automatic-entry-resolution
//      */
//     // entry: entries,
//     // context: __dirname,
//     // target: 'node',
//     // output: {
//       // libraryTarget: 'commonjs',
//       // path: path.resolve(__dirname, '.webpack'),
//       // filename: '[name].js',
//       // sourceMapFilename: '[file].map',
//     // },
//     // /**
//     //  * @link https://www.serverless.com/plugins/serverless-webpack#output
//     //  */
//     // externals: [nodeExternals()],
//     // plugins: [
//     //   // new SourceMapDevToolPlugin({
//     //   //     filename: '[file].map',
//     //   //     publicPath: '',
//     //   //     fileContext: 'public',
//     //   //     module: true,
//     //   //     moduleFilenameTemplate: (info: any) => {
//     //   //         // Modify the source map file path here
//     //   //         return info.absoluteResourcePath;
//     //   //     },
//     //   // }),
//     // ],
//     /**
//      * @link https://www.serverless.com/plugins/serverless-webpack#invocation-state
//      */
//     // mode: isLocal ? 'development' : 'production',
//     // optimization: {
//     //   minimize: false,
//     // },

//     // resolve: {
//     //   // Add `.ts` and `.tsx` as a resolvable extension.
//     //   extensions: ['.ts', '.js'],
//     //   // Add support for TypeScripts fully qualified ESM imports.
//     //   extensionAlias: {
//     //     '.js': ['.js', '.ts'],
//     //     '.cjs': ['.cjs', '.cts'],
//     //     '.mjs': ['.mjs', '.mts'],
//     //   },
//     // },
//     // // module: {
//     //   rules: [
//     //     // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
//     //     { test: /\.([cm]?ts)$/, loader: 'ts-loader' },
//     //   ],
//     // },
//     // watch: isLocal,
//     // stats: isLocal ? 'detailed' : 'minimal',
//   };

//   return config;
// })();


import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import slsw from 'serverless-webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const { entries, webpack: { isLocal } } = slsw.lib;
// Only offline environment should have nvm installed with NVM_ environment variables
const local = isLocal || Object.keys(process.env).filter(k => k.startsWith('NVM_')).length > 0;
const relativeProjectPath = path.relative(workspaceRoot, __dirname);

const config: webpack.Configuration = {
  context: __dirname,
  target: 'node',
  node: false,
  entry: entries,
  mode: local ? 'development' : 'production',
  devtool: local ? 'eval-cheap-module-source-map' : 'source-map',
  stats: local ? 'detailed' : 'minimal',
  externalsPresets: { 
    node: true,
  },
  externals: [
    nodeExternals({
      modulesFromFile: {
        exclude: ['devDependencies'],
      },
    }),
    'aws-sdk',
    '^@aws-sdk.*$'
  ],
  plugins: [
    local ? new webpack.HotModuleReplacementPlugin() : false,
    new webpack.AutomaticPrefetchPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: './config', to: './config' },
      ],
    }),
  ],
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  cache: {
    type: 'filesystem',
    compression: 'gzip',
    cacheDirectory: path.resolve('.webpackCache'),
  },
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    path: path.join(__dirname, '.webpack'),
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
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        options: { 
          transpileOnly: true,
        },
        exclude: [
          /node_modules/,
          /__mocks__/,
          /__tests__/,
          /.serverless/,
          /.webpack/,
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
}

export default config;