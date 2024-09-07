const path = require("path");
const { merge } = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Serve files from the output directory
    },
    devMiddleware: {
      writeToDisk: true, // Useful if you need to write files to disk
    },
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js", // Development-friendly filename
  },
});
