const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') }),
      new VueLoaderPlugin(),
      new webpack.ProgressPlugin(),
      // isDev && new webpack.ProgressPlugin(),
      // !isDev &&
      //   new MiniCssExtractPlugin({
      //     filename: 'css/[name].[contenthash:8].css',
      //     chunkFilename: 'css/[name].[contenthash:8].css',
      //   }),
    ],
    module: {
      rules: [
        {
          test: /\.vue?$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/i,
          // use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
          use: ['vue-style-loader', 'css-loader'],
        },
      ],
    },
    devServer: (mode = 'development'
      ? {
          port: env.port ?? 3000,
          open: true,
          historyApiFallback: true,
        }
      : undefined),
  };
};
