import path from "path";
import { fileURLToPath } from "url";

import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

import pkg from "./package.json" assert { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  mode: "production",
  target: "web",
  entry: "./src/main.ts",
  module: {
    rules: [
      {
        test: /\.ts?x?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/i,
        use: [
          { loader: "style-loader", options: { injectType: "styleTag" } },
          "css-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss"],
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
    },
    alias: {
      react: "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pkg.version),
      INDEX_VERSION: JSON.stringify(1),
      INDEX_URL: JSON.stringify("https://cml.snowy.cafe/index.json"),
    }),
  ],
  devtool: "source-map",
  output: {
    filename: "cModLoader.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 4000,
  },
};
