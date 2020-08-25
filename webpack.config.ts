import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import dotenv from 'dotenv';
// html-replace-webpack-plugin does not have types :(
// @ts-ignore
import HtmlReplaceWebpackPlugin from 'html-replace-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';

// set NODE_ENV to dev if not set in a npm script that launches webpack
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = process.env.NODE_ENV === 'development';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const config: webpack.Configuration = {
  entry: ['./src/app.tsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // makes dev server work with nested paths
    publicPath: '/',
  },
  watchOptions: {
    // needed for WebPack to attempt recompiling periodically after a failure
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        use: [
          isDevelopment && {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          'ts-loader',
        ].filter(Boolean) as webpack.RuleSetUseItem[],
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // hot module reload for SCSS in development
              hmr: isDevelopment,
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'FIREBASE_API_KEY',
      'FIREBASE_AUTH_DOMAIN',
      'FIREBASE_DATABASE_URL',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_STORAGE_BUCKET',
      'FIREBASE_MESSAGING_SENDER_ID',
      'FIREBASE_APP_ID',
      'FIREBASE_MEASUREMENT_ID',
      'GCP_STORAGE_URL',
    ]),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: './src/images/favicon.png',
      title: 'https://storage.googleapis.com/zaino-2e6cf.appspot.com/mountain.svg',
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '$gcp-storage-url$',
        replacement: process.env.GCP_STORAGE_URL,
      },
    ]),
    new MiniCssExtractPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean) as webpack.Plugin[],
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
  },
};

export default config;