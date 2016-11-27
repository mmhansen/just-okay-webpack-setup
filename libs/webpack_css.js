const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');
/*
 * Take the CSS out of the JS
 */
exports.extractCSS = function(paths) {
  return {
    module: {
      loaders: [
        {
          test: /(\.css|\.scss)$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass')
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  }
}
/*
 * Transpile the css
 */

exports.setupCSS = function(paths) {
  return {
    module: {
      loaders: [
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') }
      ]
    },
    postcss: [
      require('autoprefixer-core'),
      require('postcss-color-rebeccapurple')
    ],
    plugins: [
      new ExtractTextPlugin('[name].[chunkhash].css', {allChunks: true})
    ]
  }
}

/*
 * Will remove any unused CSS
 */
exports.purifyCSS = function(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        paths: paths
      })
    ]
  }
}
