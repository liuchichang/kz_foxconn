const webpack = require('webpack');

module.exports = {
  "transpileDependencies": [
    "vuetify",
    'resize-detector'
  ],
  // publicPath:'',   //process.env.NODE_ENV === "production" ? "/banner-project" : "/",
  publicPath: process.env.NODE_ENV === 'production'
    ? '/kz_foxconn/' // test20200915 為 repo 名稱
    : '/',
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