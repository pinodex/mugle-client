const { DefinePlugin } = require('webpack');
const { site } = require('./src/config');

module.exports = {
  productionSourceMap: false,

  assetsDir: 'assets/',

  configureWebpack: {
    plugins: [
      new DefinePlugin({
        'process.env': {
          API_URL: JSON.stringify(process.env.API_URL),
          WS_URL: JSON.stringify(process.env.WS_URL),
        },
      }),
    ],
  },

  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        const newArgs = [...args];

        newArgs[0].SITE_TITLE = site.title;
        newArgs[0].SITE_DESCRIPTION = site.description;
        newArgs[0].SITE_URL = site.url;

        return newArgs;
      });

    config.module
      .rule('vue')
      .use('vue-svg-inline-loader')
      .loader('vue-svg-inline-loader');
  },
};
