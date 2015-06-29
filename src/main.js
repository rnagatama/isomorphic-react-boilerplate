import express from 'express';
import path from 'path';
//import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import httpProxy from 'http-proxy';
import config from './server/config';
import api from './api';
import server from './server';

// initialize app
var app = express();
var proxy = httpProxy.createProxyServer();

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'server/views'));

// configure app
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(path.join(__dirname, './build')));

// mount sub app
app.use('/api', api);
app.use('/', server);

/*
if (!config.isProduction) {
  // We require the bundler inside the if block becuase
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  var bundle = require('./webpack/bundle');
  bundle();

  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}
*/

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*
// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', (e) => {
  console.log('Could not connect to proxy, please try again...');
});
*/

app.listen(config.port, () => {
  console.log('Server running on port ' + config.port);
});
