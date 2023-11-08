const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/js/index.js',
  plugins: [
    new HtmlWebpackPlugin({     // Also generate a test.html
        filename: 'index.html',
        template: 'src/index.html'
      })
  ],
  devServer: {
    static: './docs',
  },
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }
};