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
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new webpack.NamedModulesPlugin()
];
if (!isProduction) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}
const entry = isProduction
  ? ['./src/server.ts']
  : ['webpack/hot/poll?1000', './src/server.ts'];
module.exports = {
  mode: 'development',
  devtool: false,
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?1000']
    })
  ],
  name: 'server',
  plugins: plugins,
  target: 'node',
  entry: entry,
  output: {
    publicPath: './dist/',
    path: path.resolve(__dirname, './dist/'),
    filename: 'server.prod.js'
    // libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['./node_modules']
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        options: {
          babelrc: true,
        },
        test: /\.(js|ts)$/,
      }
    ]
  },
  node: {
    Buffer: false,
    __dirname: false,
    __filename: false,
    console: false,
    global: false,
    process: false,
  },
};
