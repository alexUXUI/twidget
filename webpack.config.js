'use strict'

const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
  entry: ['babel-polyfill', "./public/scripts/codebird.js", "./public/scripts/app.js"],
  output: {
    filename: "./dist/twitter-widget.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new DotenvPlugin({
      sample: './.env',
      path: './.env'
    })
  ],
  watch: true
}
