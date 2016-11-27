const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
/*
 * Setup the input and output paths for the bundler
 */
exports.common = function (PATHS) {
  return {
    entry: {
      app: PATHS.app
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    resolve: {
      extensions: ['', '.js', '.jsx', '.json']
    }
  }
};
/*
 * Setup the JS loaders
 */
exports.setupJS = function () {
  return {
    module: {
     loaders: [
       {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         query: {
           presets: ['es2015', 'react', 'stage-0']
         }
       },
       {
         test: /\.json$/,
         loader: "json"
       }
     ]
    }
  }
}
/*
 * Make the HTML from an ejs template
 */
exports.autoHtml = function (options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        title: options.title || "",
        template: options.template
      })
    ]
  }
}
/*
 * Configure the webpack-dev-server
 */
exports.devServer = function(options) {
  return {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}
