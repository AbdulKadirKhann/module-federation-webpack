const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: './src/main.ts', // for local dev
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8081/',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      vue: '@vue/runtime-dom',
    },
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.vue$/, loader: 'vue-loader' },
      { test: /\.ts$/, loader: 'ts-loader', options: { appendTsSuffixTo: [/\.vue$/] } },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'users_app_vue3',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/bootstrap.ts',
      }
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    port: 8081,
    static: path.join(__dirname, 'dist'),
    hot: true,
  },
};
