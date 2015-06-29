export default (isDevelopment) => {
  // development error handler
  // will print stacktrace
  if (isDevelopment) {
    return (err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    }
  }

  // production error handler
  // no stacktraces leaked to user
  return (err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
};