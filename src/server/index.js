import express from 'express';
import compression from 'compression';
import path from 'path';
import Immutable from 'immutable';
import favicon from 'serve-favicon';
import reactApp from './reactApp';
import authentication from '../lib/authentication';
import router from './router';
import authorization from './authorization';
import login from './login';
import errorHandler from './errorHandler';

var app = express();
const isDevelopment = app.get('env') === 'development';

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.use(compression());
//app.use(favicon(__dirname + '/static/favicon.ico'));
app.use('/build', express.static('build'));
app.use('/assets', express.static('assets'));
app.post('/login', login);
app.use(authentication);
app.use(router);
app.use(authorization);
app.use(reactApp);
app.use(errorHandler(isDevelopment));

app.on('mount', () => {
  console.log('Tamapos app is now available at path %s', app.mountpath);
});

export default app;
