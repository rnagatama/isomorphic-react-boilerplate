var config = {
  appLocales: ['en', 'fr'],
  defaultLocale: 'en',
  googleAnalyticsId: 'UA-XXXXXXX-X',
  isProduction: process.env.NODE_ENV === 'production',
  piping: {
    // Ignore webpack custom loaders on server. TODO: Reuse index.js config.
    ignore: /(\/\.|~$|\.(css|less|sass|scss|styl))/,
    // Hook ensures server restart on all required deps, even client side.
    // Server restarting invalidates require cache, no more stale html.
    hook: true
  },
  host: 'localhost',
  port: process.env.PORT || 3000,
  version: require('../../package').version,
  webpackStylesExtensions: ['css', 'sass', 'scss']
};

module.exports = config;
