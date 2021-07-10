const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (!req.user) {
    next()
  } else {
    res.redirect("/timeline");
  }
};

module.exports.administrator = (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {
    res.redirect("/")
  }
};
