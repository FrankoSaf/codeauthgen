const User = require('../models/User');
const ExpressError = require('../ExpressError');
exports.restartPassword = async (req, res, next) => {
  const token = req.params.id;
  try {
    const user = await User.findOne({ resetLink: token });
    if (user) {
      next();
    } else {
      return next(new ExpressError('Page not found', 404));
    }
  } catch (err) {
    next(new ExpressError('Invalid', 401));
  }
};
