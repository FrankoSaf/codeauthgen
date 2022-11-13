const passportOauth = (app) => {
  // passport codes start
  const passport = require('passport');
  const GitHubStrategy = require('passport-github2').Strategy;
  const GoogleStrategy = require('passport-google-oauth20');
  const User = require('./models/User');
  const bcrypt = require('bcrypt');
  require('dotenv').config();
  const config = require('./config');

  const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
  const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL:
          config[config.model].domain + '/authentication/github/callback',
      },
      function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        // console.log(profile._json)
        // console.log(profile._json.email, profile._json.url, profile._json.name)

        User.findOne({ githubID: profile._json.id }, (err, user) => {
          if (err) return console.error(err);
          if (user) return done(null, user);
          // no such user found in db, create new user

          let githubEmail;
          // to see if this email alreay in out db
          if (profile._json.email) {
            User.findOne({ email: profile._json.email }, (err, existUser) => {
              if (err) return console.error(err);

              if (existUser)
                // if we find this email, update this user with his github id
                User.findOneAndUpdate(
                  { _id: existUser._id },
                  { $set: { githubID: profile._json.id } },
                  { new: true },
                  (err, updatedUser) => {
                    if (err) return console.error(err);
                    return done(null, updatedUser);
                  }
                );
              else {
                // no existUser we will save him
                githubEmail = profile._json.email;
                // here need bcrypt the password
                bcrypt.hash(profile._json.url, 10, (err, notPassword) => {
                  if (err) return console.error(err);
                  User.create({
                    githubID: profile._json.id,
                    email: githubEmail,
                    password: notPassword,
                    firstName: profile._json.name,
                    lastName: '   ',
                    verified: true,
                    avatar: profile._json.avatar_url,
                  })
                    .then((newUser) => done(null, newUser))
                    .catch((err) => console.error(err));
                });
              }
            });
          } else {
            // profile._json.email is not true
            githubEmail = 'thisIsFakeEmail' + profile._json.id + '@github.com';
            // here need bcrypt the password
            bcrypt.hash(profile._json.url, 10, (err, notPassword) => {
              if (err) return console.error(err);
              User.create({
                githubID: profile._json.id,
                email: githubEmail,
                password: notPassword,
                firstName: profile._json.name,
                lastName: '   ',
                verified: true,
                avatar: profile._json.avatar_url,
              })
                .then((newUser) => done(null, newUser))
                .catch((err) => console.error(err));
            });
          }
        });
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL:
          config[config.model].domain + '/authentication/google/callback',
      },
      function (accessToken, refreshToken, profile, cb) {
        // console.log(profile, 'profile222222222222')

        User.findOne({ googleID: profile._json.sub }, (err, user) => {
          if (err) return console.error(err);
          if (user) return cb(null, user);
          // no such user found in db, create new user

          // no email we will create one new
          const googleEmail =
            'thisIsFakeEmail' + profile._json.sub + '@google.com';
          // here need bcrypt the password
          bcrypt.hash(profile._json.picture, 10, (err, notPassword) => {
            if (err) return console.error(err);
            User.create({
              googleID: profile._json.sub,
              email: googleEmail,
              password: notPassword,
              firstName: profile._json.given_name,
              lastName: profile._json.family_name,
              verified: true,
              avatar: profile._json.picture,
            })
              .then((newUser) => {
                return cb(null, newUser);
              })
              .catch((err) => console.error(err));
          });
        });
      }
    )
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // app.get('/logout', function(req, res){
  //    req.logout();
  //    res.redirect('http://localhost:3000');
  //  });

  // it's not working , even we get profiel from github, there is no req.isAuthenticated function in req
  //  function ensureAuthenticated(req, res, next) {
  //   if (req.session.user) {
  //     req.user = req.session.user
  //     return next();
  //   }
  //   else if (req.isAuthenticated()) { return next(); }
  //   res.redirect('/login')
  // }
  // passport codes endet
};

module.exports = passportOauth;
