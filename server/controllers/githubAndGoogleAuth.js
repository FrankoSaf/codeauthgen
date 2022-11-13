const config = require('../config');

function githubCallback(req, res) {
  req.session.user = req.user;
  res.redirect(config[config.model].frontEnd + '/profile');
}

function googleCallback(req, res) {
  req.session.user = req.user;
  res.redirect(config[config.model].frontEnd + '/profile');
}
module.exports = { githubCallback, googleCallback };
