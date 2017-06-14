var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: {
    jsx: "./src/index.jsx",
    css: "./src/main.css",
    html: "./src/index.html",
  },

  output: {
    path: __dirname + "/static",
    filename: "bundle.js",
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: true,
        output: {comments: false}
    })
  ],
  module: {
    preLoaders: [
        //Eslint loader
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "eslint-loader"},
    ],
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]" },
      { test: /\.css$/, loader: "file?name=[name].[ext]" },

      { test: /\.jsx?$/, exclude: /node_modules/, loaders: ["react-hot","babel-loader"]},
      {
                test: /\.json?$/,
                loader: 'json-loader'
        },
        {
          test: /\.css$/,
            loader: 'style-loader!css-loader',
              include: /flexboxgrid/
        }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  eslint: {
    configFile: './.eslintrc'
  },
};
