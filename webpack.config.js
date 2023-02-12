const debug = process.env.NODE_ENV !== 'production'
// eslint-disable-next-line no-unused-vars
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const path = require('path')

module.exports = {
  context: __dirname,
  // production, developmentの2種類がある
  // developmentだとminifyなしで見やすく
  // productionだとminifyをしてくれる
  mode: debug ? 'development' : 'production',
  entry: './src/js/client.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['react-html-attrs'],
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          // "style-loader", // index.htmlにcssを書き込む場合
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'] // モジュールimportの際に拡張子を省略できる
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'client.min.js' // jsの出力先のファイル名
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.min.css' // cssの出力先のファイル名
    }),
    new Dotenv() // .env読み込み
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // minify js
      new CssMinimizerPlugin() // minify css
    ]
  },
  devtool: 'inline-source-map', // ソースマップの設定。コンパイル前と後の対応関係が記述されたファイルを生成してくれる
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'public') // staticファイルの置き場所
    }
  }
}
