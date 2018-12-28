const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.ts|.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
