"use strict";

const path = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");
const CopyPlugin = require("copy-webpack-plugin");

/**@type {import('webpack').Configuration} */
const commonConfig = {
  name: "common",
  mode: "development",
  devtool: "source-map",
  stats: "errors-only",
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({ clearConsole: false }),
    new WebpackBar(),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
};

/**@type {import('webpack').Configuration} */
const content = {
  name: "content",
  target: "web",
  entry: "./src/content/script/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "content.js",
  },
  ...commonConfig,
};

/**@type {import('webpack').Configuration} */
const background = {
  name: "background",
  target: "web",
  entry: "./src/background/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "background.js",
  },
  ...commonConfig,
};

module.exports = [content, background];
