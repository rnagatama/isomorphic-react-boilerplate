import React from 'react';
import Router from 'react-router';
import Immutable from 'immutable';
import whenKeys from 'when/keys';
import routes from './routes';
import fetchData from '../lib/fetchData';

// Never render to body. Everybody updates it.
// https://medium.com/@dan_abramov/two-weird-tricks-that-fix-react-7cf9bbdef375
const app = document.getElementById('app');
const resolveHash = whenKeys.all;
var state = window.__STATE__ || {};
var initialRender = true;

/**
 * Render React App
 * @param  {ReactElement} Handler
 */
function render(Handler) {
  console.time('app render on route change'); // eslint-disable-line no-console
  React.render(<Handler {...state} />, app, () => {
    console.timeEnd('app render on route change'); // eslint-disable-line no-console
  });
}

// Run router and callback is called when history events happen
Router.run(routes, Router.HistoryLocation, (Handler, routerState) => {
  // render directly without fetching data on the first try
  if (initialRender) {
    render(Handler);
    initialRender = false;
    return;
  }

  // fetch data then render
  fetchData(state.authToken, routerState).then((data) => {
    // merge state
    const newData = Immutable.fromJS(state).mergeDeep(data).toJS();
    state = newData;
    render(Handler);
  });
});

// if ('production' === process.env.NODE_ENV) {
//   // TODO: Report app errors.
// }
