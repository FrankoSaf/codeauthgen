const { check } = require('express-validator');
const User = require('../models/User');
const ExpressError = require('../ExpressError');
const bcrypt = require('bcrypt');
exports.updatingUser = [
  check('firstName')
    .isLength({ min: 3 })
    .withMessage('First name should be at least 3 characters'),
  check('lastName')
    .isLength({ min: 3 })
    .withMessage('Last name should be at least 3 characters'),
  check('oldPassword')
    .optional()
    .custom(async (val, { req }) => {
      const user = await User.findById(req.body.id);
      if (await bcrypt.compare(val, user.password)) {
        return true;
      } else {
        throw new ExpressError('Password is incorrect', 300);
      }
    }),
  check('newPassword')
    .if(check('oldPassword').exists())
    .isLength({ min: 6 })
    .withMessage('New password should be at least 6 characters long'),
  check('newPasswordConfirm')
    .if(check('newPassword').exists())
    .custom((val, { req }) => {
      if (val === req.body.newPassword) {
        return true;
      } else {
        throw new ExpressError('Password not match');
      }
    }),
];
