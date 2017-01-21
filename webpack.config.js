const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {app: [path.resolve(__dirname, "src", "client", "index.js")]},
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build", "client"),
    publicPath: ""
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx"],
    alias: {utils: path.resolve(__dirname, "src", "utils", "index.js")}
  },
  devtool: "eval-source-map",
  devServer: {
    contentBase: [path.resolve(__dirname, "public")],
    inline: true,
    host: "localhost",
    port: 3000
  },
  module: {
    rules: [
      {
        test: [/\.jsx?$/],
        include: [path.resolve(__dirname, "src")],
        use: [{loader: "babel-loader"}]
      },
      {
        test: [/\.scss$/],
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader"},
        ] 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "client", "index.html")
    })
  ]
};
