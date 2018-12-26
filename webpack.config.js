const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SizePlugin = require('size-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const {argv} = require('yargs');

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

const buildPath = `${__dirname}/dist`;
const publicPath = argv.publicPath || '/dist';

module.exports = {
  entry: {
    'core': './src/modules/core/index.ts',
  },
  output: {
    path: buildPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath,
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
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['core.js'],
      rules: [{
        search: 'importScripts(({',
        replace: `importScripts('${publicPath}' + ({`,
      }],
    }]),
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