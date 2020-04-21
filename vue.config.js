const webpack = require('webpack')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/share/' : '/',
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /de|fr|hu/
      )
    ]
  }
}
