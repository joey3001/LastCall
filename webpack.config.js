const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: "./dist",
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body"
    }),

    new HtmlWebpackPlugin({
      template: "./src/beer101.html",
      filename: "beer101.html"
    }),

    new HtmlWebpackPlugin({
      template: "./src/breweryfinder.html",
      filename: "breweryfinder.html",
      inject: "body"
    }),

    new HtmlWebpackPlugin({
      template: "./src/titlepage.html",
      filename: "titlepage.html",
      inject: "body"
    }),
    
  ],
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/images/",
            },
          },
        ],
      },

      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
    ],
  },
};
