const webpack = require('webpack');

module.exports = {
  "transpileDependencies": [
    "vuetify",
    'resize-detector'
  ],
  // publicPath: process.env.NODE_ENV === "production" ? "/foxconn/" : "/",
  publicPath: './',
  devServer: {
    port: 8080,
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'windows.jQuery': 'jquery',
      }),
    ],
    
  },
}