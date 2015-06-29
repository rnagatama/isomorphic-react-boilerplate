export default (req, res) => {
  const {username, password} = req.body;
  var error = {}
  var authToken;
  var httpStatus = 200;

  res.clearCookie('authToken');

  // TODO: check username & password in the database
  // ...
  
  if (authToken) {
    // put authToken to cookie
    res.cookie('authToken', authToken, { maxAge: 1000 * 5, httpOnly: true });
  } else {
    httpStatus = 400;
    error = { message: 'Invalid username or password' };
  }

  res.status(httpStatus).json({ error, authToken });
};