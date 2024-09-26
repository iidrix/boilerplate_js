import path from "path";
import { fileURLToPath } from "url";
import { merge } from "webpack-merge";
import config from "./webpack.config.js";

// Simulate __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(config, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Serve files from the public directory
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
