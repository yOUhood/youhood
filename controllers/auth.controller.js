const mongoose = require("mongoose");
const User = require("../models/user.model");
const mailer = require("../config/mailer.config")
const teams = require("../data/teams.json");
const offices = require("../data/offices.json");

module.exports.register = (req, res, next) => {
  res.render("auth/register", {
    teams,
    offices,
  });
};

module.exports.doRegister = (req, res, next) => {
  function renderWithErrors(errors) {
    res.render("auth/register", {
      user: req.body,
      errors: errors,
      teams,
      offices,
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        renderWithErrors({ email: "email already registered." });
      } else {
        user = { name, lastName, email, password, phone, team, office, admin } =
          req.body;
      }
      return User.create(user).then((user) => {
        mailer.sendValidationEmail(user);
        res.redirect('/');
      });
    })
    .catch((error) => {
      console.log(error);
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    });
};
