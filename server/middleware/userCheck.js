const ExpressError = require('../ExpressError');

const userCheck = (req, res, next) => {
  if (req.session.user) {
    if (req.session.user.verified === true) {
      next();
    } else {
      throw new ExpressError('Verify to see the content', 401);
    }
  } else {
    throw new ExpressError('You are not authorized', 401);
  }
};

module.exports = { userCheck };