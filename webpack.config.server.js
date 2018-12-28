// const path = require('path');
// const nodeExternals = require('webpack-node-externals');

// module.exports = {
//   target: 'node',
//   mode: 'development',
//   entry: './src/index.ts',
//   output: {
//     path: path.join(__dirname, 'dist'),
//     publicPath: '/',
//     filename: 'index.js'
//   },
//   resolve: {
//     extensions: ['.ts', '.js']
//   },
//   externals: [nodeExternals()],
//   module: {
//     rules: [
//       {
//         test: /\.ts|.js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             babelrc: true
//           }
//         }
//       }
//     ]
//   }
// };

const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const nodeEnv = process.env.NODE_ENV;
const isProduction = nodeEnv !== 'development';
// Common plugins
let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv),
    },
  }),
  new webpack.NamedModulesPlugin(),
];
if (!isProduction) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
const entry = isProduction
  ? ['./src/server.ts']
  : ['webpack/hot/poll?1000', './src/server.ts'];
module.exports = {
  devtool: false,
  entry: entry,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000'],
    }),
  ],
  mode: 'development',
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
        test: /\.(js|ts)$/,
      },
    ],
  },
  name: 'server',
  node: {
    Buffer: false,
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
  },
  output: {
    filename: 'server.prod.js',
    path: path.resolve(__dirname, './dist/'),
    publicPath: './dist/',
    // libraryTarget: 'commonjs2'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['./node_modules'],
  },
  target: 'node',
};
