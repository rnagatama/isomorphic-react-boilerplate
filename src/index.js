var config = require('./server/config');

// register babel to use ES6 syntax
require('babel/register');

// To ignore webpack custom loaders on server.
config.webpackStylesExtensions.forEach(function(ext) {
  require.extensions['.' + ext] = function() {};
});

require('./main');
