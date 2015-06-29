import React from 'react';
import {DefaultRoute, NotFoundRoute, Route} from 'react-router';
import App from './app/app.jsx';
import NotFound from './pages/notFound.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';

export default (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} name="home" />
    <NotFoundRoute handler={NotFound} name="not-found" />
    <Route handler={Login} name="login" />
  </Route>
);
