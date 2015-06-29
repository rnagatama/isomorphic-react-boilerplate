export default function(req, res, next) {
  const isLogin = req.router.state.routes.some(route => route.name === 'login');
  var authorized = isLogin;
  authorized = true;

  if (!authorized) {
    res.redirect(303, '/login');
    return;
  }

  next();
}
