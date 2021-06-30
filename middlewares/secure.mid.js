const User = require("../models/user.model");

module.exports.isAuthenticated = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports.isNotAuthenticated = (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports.administrator = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        if (user.admin == req.user.id) {
          req.user = user;
          next();
        } else {
          next(createError(403));
        }
      } else {
        next(createError(404));
      }
    })
    .catch(next);
};
