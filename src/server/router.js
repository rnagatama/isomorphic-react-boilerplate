import Router from 'react-router';
import routes from '../client/routes';

export default function(req, res, next) {
  const router = Router.create({
    routes,
    location: req.originalUrl,
    onError: next,
    onAbort: (abortReason) => {
      next(abortReason);
    }
  });

  router.run((Handler, state) => {
    req.router = {
      Handler: Handler,
      state: state
    };
    next();
  });
}
