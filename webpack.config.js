const path = require('path');

module.exports = {
  target: 'node',
  entry: {
    main: {
      app: ['./src/index.ts']
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  externals: [nodeExternals()]
};
