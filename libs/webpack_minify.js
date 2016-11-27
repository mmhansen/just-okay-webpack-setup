const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');

/*
 * Uglify the existing code
 */
exports.minify = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  }
}
/*
 * Delete the build directory
 */
exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  }
}
/*
 * This will extract the duplicate chunks into a single file that can be referenced by the app bundle
 */
exports.extractBundle = function(options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    entry: entry,
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
}
