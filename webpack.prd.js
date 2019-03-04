/**
 * 生产构建配置
 */
const path = require('path');
const packageJson = require('./package.json');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    index: './src/entry/index/index.js',
    top: './src/entry/topview/top.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash:8].js',
  },
  mode: 'production',
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
        use: [{
          loader: 'url-loader',
          options: {
            limit: 15360,
            fallback: {
              loader: 'file-loader',
              options: {
                name: '[name].[hash:8].[ext]',
              },
            },
          },
        }],
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
          },
        }, 'sass-loader'],
      },
      {
        test: /\.ya?ml$/,
        use: {
          loader: 'yaml-import-loader',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: 'vendors.[contenthash:8].js',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new MinifyPlugin(),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {from: 'public'},
    ]),
    new MiniCssExtractPlugin({
      filename: '[id].[contenthash:8].css',
    }),
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
  ],
};
