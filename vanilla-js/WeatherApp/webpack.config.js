
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",

  entry: {
    main: './src/index.js', 
  },

  output: {
    filename: "[name].bundle.js", // The output will be main.bundle.js
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  devtool: "eval-source-map",

  devServer: {
    static: "./dist",
    watchFiles: ["./index.html"], 
    hot: true,
  },

  plugins: [

    new HtmlWebpackPlugin({ 
        template: "./index.html", 
        filename: "index.html" 
    }),

    new CopyPlugin({
      patterns: [
        { from: "img", to: "img" },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};