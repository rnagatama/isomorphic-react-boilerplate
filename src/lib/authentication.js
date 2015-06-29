import jwt from 'jsonwebtoken';
import config from './config';

export default function(req, res, next) {
  var token = req.cookies.authToken;
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.clearCookie('authToken');
        err.status = 301;
      } else {
        req.authToken = decoded;
      }

      next(err);
    });
    return;
  }

  next();
}
