const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/share/' : '/',
  configureWebpack: {
    plugins: [
      new webpack.ContextReplacementPlugin(
        /moment[/\\]locale$/,
        /de|fr|hu/
      ),
      new CompressionPlugin({
        test: /\.(js|css|html)$/,
        threshold: 10240,
        minRatio: 0.8,
        algorithm: 'gzip'
      })
    ]
  }
}
