const User = require("../models/User");
const bcrypt = require("bcrypt");
const ExpressError = require("../ExpressError");
const { emailSender } = require("../models/Email");
const jwt = require("jsonwebtoken");
// const FormData = require("form-data");

//registration function

exports.registrationController = async (req, res, next) => {
  const user = req.body;
  const domain = req.get('origin');
  try {
    const newUser = new User(user);
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    newUser.password = hash;
    await newUser.save();
    //sending verification email to user
    emailSender(newUser.email, newUser._id, domain);
    req.session.user = await User.findOne({ email: newUser.email }).select(
      "-password"
    );
    res.send("Successfully");
  } catch (err) {
    next(new ExpressError("Failed to register, please try again", 300));
  }
};

//logging in function

exports.loginController = async (req, res, next) => {

  // for google login
  if (req.body.googleLogin) {
    const user = await jwt.decode(req.body.token);
    req.session.user = user;
    req.session.save();
    res.json(user);
  } else {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email: email });
      if (await bcrypt.compare(password, user.password)) {
        req.session.user = await User.findOne({ email: email }).select(
          "-password"
        );
        res.json(req.session.user);
      } else {
        throw new ExpressError("Email or password not valid", 300);
      }
    } catch (err) {
      next(new ExpressError("Email or password not valid", 300));
    }
  }
};

// logout Function

exports.logoutController = async (req, res) => {
  // req.logout && req.logout();  // how to log out ?
  req.session.destroy();
  res.json("You are logged out");
};

//Email controller for finding a user by id and verifying it in database

exports.emailVerificationController = async (req, res, next) => {
  const id = req.params.id;


  try {
    const loggedUser = await User.findByIdAndUpdate(
      id,
      {
        verified: true,
      },
      { new: true }
    ).select("-password");
    req.session.user = loggedUser;
    await req.session.save();
    res.redirect("/profile");
  } catch (err) {
    next(new ExpressError("User ID not valid", 400));
  }
};

exports.loginStateCheck = (req, res) => {
  const user = req.session.user;
  if (user) res.json({ user, isLoggedIn: true });
  else res.json({ isLoggedIn: false });
};


exports.googleLogin = (req, res) => {
  
}