const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const IgnoreEmitPlugin = require("ignore-emit-webpack-plugin")

module.exports = {
  mode: "production",
  entry: {
    main: "./src/tokens/temp/main.css",
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    // Or simply: new IgnoreEmitPlugin(/\**\.js$/)
    new IgnoreEmitPlugin(["main.js"]),

    new MiniCssExtractPlugin({
      filename: "tokens/[name].css",
    }),
  ],
}
