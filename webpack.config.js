const path = require('path');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
/*
 * get the configuration modules
 */
const common = require('./libs/webpack_common');
const css    = require('./libs/webpack_css')
const minify = require('./libs/webpack_minify')
/*
 * get the package.json so that we can extract the dependencies into a vendor bundle
 */
const pkg = require('./package.json');
/*
 * determine root paths
 */
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

var config;

// Detect how npm is run and branch based on that
switch(process.env.npm_lifecycle_event) {
  case 'build':
  case 'stats':
    config = merge(
      minify.clean(PATHS.build),
      common.common(PATHS),
      common.setupJS(),
      common.autoHtml({
        template: './app/index.ejs',
        title: 'Webpack'
      }),
      {
        output: {
          path: PATHS.build,
          filename: '[name].[chunkhash].js',
          // This is used for require.ensure. The setup
          // will work without but this is useful to set.
          chunkFilename: '[chunkhash].js',
          publicPath: './'
        }
      },
      minify.extractBundle({
        name: 'vendor',
        entries: Object.keys(pkg.client)
      }),
      css.setupCSS(),
      minify.minify()
      );
    break;
  default:
    config = merge(
      { devtool: 'source-map' },
      common.common(PATHS),
      common.setupJS(),
      common.autoHtml({
        template: './app/index.ejs',
        title: 'Webpack'
      }),
      css.setupCSS(),
      common.devServer({
        host: process.env.HOST,
        port: process.env.PORT
      })
    );
}

module.exports = validate(config, {
  quiet: true
});
