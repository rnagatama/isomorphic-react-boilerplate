import React from 'react';
import Immutable from 'immutable';
import DocumentTitle from 'react-document-title';
import Html from './views/main.jsx';
import serverConfig from './config';
import apiConfig from '../api/config';
import initialState from './initialstate';
import fetchData from '../lib/fetchData';

export default function(req, res, next) {
  var RouterHandler = req.router.Handler;
  var routerState = req.router.state;
  var appConfig = generateAppConfig();
  const authToken = req.cookies.authToken;

  return fetchData(authToken, routerState)
    .then((data) => generateAppState(authToken, data))
    .then((appState) => generateHtml(RouterHandler, appState, appConfig))
    .then((html) => {
      const notFound = routerState.routes.some(route => route.name === 'not-found');
      const status = notFound ? 404 : 200;

      res.status(status).send(html);
    });
}

/**
 * Generate App Config
 * @return {object}
 */
function generateAppConfig() {
  return {
    version: serverConfig.version,
    host: serverConfig.host,
    port: serverConfig.port,
    isProduction: serverConfig.isProduction,
    defaultLocale: serverConfig.defaultLocale,
    apiBaseUrl: apiConfig.baseUrl
  };
}

/**
 * Generate app state
 * @parma  {string} authToken
 * @param  {object} data
 * @return {object}
 */
function generateAppState(authToken, data) {
  return Immutable
    .fromJS(initialState)
    .mergeDeep({ authToken })
    .mergeDeep(data)
    .toJS();
}

/**
 * Generate HTML
 * @param  {object} RouterHandler
 * @param  {object} appState
 * @param  {object} appConfig
 * @return {string}
 */
function generateHtml(RouterHandler, appState, appConfig) {
  const exposedState = 'window.__STATE__=' + JSON.stringify(appState) + ';';
  const exposedConfig = 'window.__CONFIG__=' + JSON.stringify(appConfig) + ';';
  const appHtml = `<div id="app">${React.renderToString(<RouterHandler {...appState} />)}</div>`;
  const appScriptSrc = serverConfig.isProduction ? '/build/app.js?v' + serverConfig.version : '//localhost:8888/build/app.js';
  const title = DocumentTitle.rewind();

  var scriptHtml = `<script>${exposedState + exposedConfig}</script>`;
  scriptHtml += `<script type="text/javascript" src="${appScriptSrc}" async="true"></script>`;

  return '<!DOCTYPE html>' + React.renderToStaticMarkup(
    <Html
      bodyHtml={appHtml + scriptHtml}
      isProduction={serverConfig.isProduction}
      title={title}
      version={serverConfig.version} />
  );
}
