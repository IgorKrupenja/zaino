import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import webpack from 'webpack';
import { getPrefetchLinks } from './src/utils/getPrefetchLinks';

// output images with proper names to dist/images dir
const fileLoaderOptions = {
  context: path.resolve(__dirname, 'src'),
  name: '[path][name].[ext]',
};

// set NODE_ENV to dev if not set in a npm script that launches webpack
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
const isDevelopment = process.env.NODE_ENV === 'development';

dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

const config: webpack.Configuration = {
  entry: [`./src/app.tsx`],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    // prevent favicon errors on nested paths with dev server
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
            // HMR for React components
            options: { plugins: ['react-refresh/babel'] },
          },
          'ts-loader',
        ].filter(Boolean) as webpack.RuleSetUseItem[],
      },
      {
        // separately process _settings.css as a module
        // needed for the exported SCSS variables to work in TS files
        test: /_export\.scss$/,
        use: [
          // style loader build times faster
          // but MiniCssExtractPlugin extracts CSS out of JS in production
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
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
      {
        // all other CSS files
        test: /\.s?css$/,
        exclude: /_export\.scss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
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
              additionalData: (content: string) => {
                return (
                  // storage url for images
                  `$gcp-storage-url: '${process.env.GCP_STORAGE_URL as string}';${content}`
                );
              },
            },
          },
          {
            // make variables and mixins accessible in every SCSS file without explicit import
            loader: 'sass-resources-loader',
            options: {
              resources: ['src/styles/base/_settings.scss', 'src/styles/base/_mixins.scss'],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        // load svg files as React components in TSX files
        issuer: /\.tsx$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/,
        // load svg files with file loader in SCSS and TS style files
        issuer: /(style\.ts|\.scss)$/,
        use: [
          {
            loader: 'file-loader',
            options: fileLoaderOptions,
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: fileLoaderOptions,
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
      'PRIVACY_POLICY_ENABLED',
    ]),
    new HtmlWebpackPlugin({
      prefetchLinks: getPrefetchLinks(),
      template: 'src/index.ejs',
      favicon: 'src/images/favicon.png',
    }),
    new MiniCssExtractPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean) as webpack.WebpackPluginInstance[],
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    hot: true,
  },
};

export default config;
