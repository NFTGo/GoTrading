const { resolve, PROJECT_PATH } = require('./constants');
const WebpackBar = require('webpackbar');

module.exports = {
  entry: {
    index: resolve(PROJECT_PATH, './src/index.ts'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: `NFTGo-aggregator-sdk.js`,
    library: `NFTGoAggregatorSdk`,
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: resolve(PROJECT_PATH, './dist'),
  },
  resolve: {
    alias: {
      '@': resolve(PROJECT_PATH, './src'),
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new WebpackBar({
      name: 'compiling~',
      color: '#fa8c16',
    }),
  ],
};
