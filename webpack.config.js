const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // добавили плагин

module.exports = {
  context: path.resolve(__dirname, 'client'),
  mode: 'production',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'client/dist/'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [
          'file-loader?name=./images/[name].[ext]',
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
};
