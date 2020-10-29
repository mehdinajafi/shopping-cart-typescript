const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "boundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    open: true,
    openPage: 'public/',
    port: 3000
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
};