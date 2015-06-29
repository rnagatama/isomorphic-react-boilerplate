import whenKeys from 'when/keys';

/**
 * Fetch data for each matched route handler
 * @param  {string} authToken
 * @param  {object} routerState
 * @return {Promise}
 */
export default (authToken, routerState) => {
  var promises = routerState.routes.filter((match) => {
    return match.handler.fetchData;
  }).reduce((promises, match) => {
    promises[match.name] = match.handler.fetchData(authToken, routerState.params, routerState.query);
    return promises;
  }, {});

  return whenKeys.all(promises);
}