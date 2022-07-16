const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
require("dotenv").config();

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

const plugins = [
  new HtmlWebpackPlugin({
    template: "./public/index.html",
    favicon: "./public/favicon.ico",
    filename: "index.html",
    manifest: "./public/manifest.json",
    inject: "body",
  }),
  new webpack.EnvironmentPlugin(["REACT_APP_WEATHER_API"]),
];

module.exports = {
  mode,
  plugins,
  entry: "./src/index.tsx",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "",
    filename: "js/main.js",
    clean: true,
    assetModuleFilename: "img/[name][ext][query]",
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
  },
  devServer: {
    hot: true,
    port: 8080,
    open: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      { test: /\.(html)$/, use: ["html-loader"] },
      {
        test: /\.(png|jpe?g|gif|svg|webp|jpg|ico)$/i,
        type: mode === "production" ? "src/assets" : "asset/resource",
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },

      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
