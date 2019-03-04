/**
 * 开发构建配置
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const packageJson = require('./package.json');
const createGlobalScss = require('./tools/create-global-scss');
const createOpenPage = require('./tools/create-open-page');
const mergeApiConfig = require('./tools/merge-api-config');

//前置处理
createGlobalScss();
createOpenPage();
mergeApiConfig();

module.exports = {
  entry: {
    index: './src/entry/index/index.js',
    top: './src/entry/topview/top.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9981,
    host: '0.0.0.0',
    useLocalIp: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {sourceMap: true},
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
          },
        }, {
          loader: 'sass-loader', 
          options: {sourceMap: true},
        }],
      },
      {
        test: /\.ya?ml$/,
        use: {
          loader: 'yaml-import-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'top.html',
      template: './src/entry/topview/top.html',
      excludeChunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/entry/index/index.html',
      excludeChunks: ['top'],
      templateParameters: {title: `${packageJson.description} v${packageJson.version}`},
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};