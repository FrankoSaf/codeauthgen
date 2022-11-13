const ExpressError = require('../ExpressError');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { resetPasswordMail } = require('../models/Email');
const jwt = require('jsonwebtoken');

const userAccountSettingsUpdate = async (req, res, next) => {
  const userId = req.params.id;
  const userUpdatedData = req.body;
  try {
    if (
      (userUpdatedData.oldPassword,
      userUpdatedData.newPassword,
      userUpdatedData.newPasswordConfirm)
    ) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(userUpdatedData.newPassword, salt);

      await User.findByIdAndUpdate(userId, {
        password: hash,
      });
    }
    const newUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: userUpdatedData.firstName,
        lastName: userUpdatedData.lastName,
      },
      { new: true }
    ).select('-password');

    req.session.user = newUser;
    res.send({newUser, msg:'Your data has been successfully updated'});
  } catch (err) {
    next(new ExpressError('Failed to Update, Please Try Again', 400));
  }
};

const resetController = async (req, res, next) => {
  const domain = req.get('origin');

  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    
    if(user != null) {
      resetPasswordMail(email, user.id, domain);
      res.send('Email sent');
    } else {
      return next(new ExpressError('Email not found', 300))
    }
  } catch (err) {
    next(new ExpressError('Failed to send email', 400) )
  }

};

const settingNewPassController = async (req, res, next) => {
  const token = req.params.id;
  const { password, confirmPassword } = req.body;
  try {
    const tokenGood = jwt.verify(token, process.env.RESTART_KEY);
    const user = await User.findOne({ resetLink: token });

    if (user.id === tokenGood._id) {
      if (password === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user.id, {
          password: hash,
          resetLink: '',
        });
        res.send('Password updated');
      } else {
        return next(new ExpressError('Passwords do not match', 400));
      }
    } else {
      return next(new ExpressError('Failed to change password. Please try again', 400));
    }
  } catch (err) {
    next(new ExpressError());
  }
};
module.exports = {
  userAccountSettingsUpdate,
  resetController,
  settingNewPassController,
};
