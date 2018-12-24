const path = require('path');
const SizePlugin = require('size-plugin');

const babelOptions = {
  presets: [
    [
      "@babel/preset-env",
      {
        "targets": {
          "esmodules": true
        }
      }
    ]
  ],
};

module.exports = {
  entry: {
    'core': './src/modules/core/index.ts',
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist',
  },
  target: "webworker",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: babelOptions,
        }
      }
    ]
  },
  plugins: [
    new SizePlugin()
  ],
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
}