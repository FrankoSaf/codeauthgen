const express = require('express');
const router = express.Router();
const {
  registrationController,
  loginController,
  emailVerificationController,
  logoutController,
  loginStateCheck,
} = require('../controllers/authController');

const passport = require('passport');
const {
  githubCallback
} = require('../controllers/githubAndGoogleAuth')

const { checkingUser } = require('../schema/registerValidation');
const { userValidation } = require('../schema/schemaValidator');

router.post('/register', checkingUser, userValidation, registrationController);
router.post('/login', userValidation, loginController);
router.get('/login', loginStateCheck);
router.get('/logout', logoutController);
router.get('/verify/:id', emailVerificationController);

// github part
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }) );
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), githubCallback)

// google part
router.get('/google', passport.authenticate('google', { scope: ['profile'] }) );
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), githubCallback);

module.exports = router;
