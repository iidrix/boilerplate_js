import path from "path";
import { merge } from "webpack-merge";
import config from "./webpack.config.js";

export default merge(config, {
  mode: "production",
  output: {
    path: path.resolve("public"), // Use path.resolve for better compatibility
    filename: "[name].[contenthash].js", // Added for proper cache busting
  },
});
