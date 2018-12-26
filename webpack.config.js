const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SizePlugin = require('size-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
  plugins: ['@babel/plugin-syntax-dynamic-import']
};

const buildPath = `${__dirname}/lib`;

module.exports = {
  entry: {
    'core': './src/modules/core/index.ts',
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/dist',
  },
  target: "webworker",
  mode: "production",
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
    new SizePlugin(),
    new CleanWebpackPlugin([buildPath]),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  optimization: {
    minimizer: [new TerserPlugin({
      terserOptions: {
        ecma: 6,
        module: true,
      }
    })],
  },
}