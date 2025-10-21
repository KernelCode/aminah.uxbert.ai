const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    entry: "./src/js/main.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      assetModuleFilename: "assets/[name][ext]",
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|gif|mp3)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/[name][ext]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/[name][ext]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
  };
};
