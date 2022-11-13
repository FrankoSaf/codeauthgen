const ExpressError = require('../ExpressError');
exports.loggedInCheck = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    next();
  } else {
    throw new ExpressError('Please login or register', 401);
  }
};
