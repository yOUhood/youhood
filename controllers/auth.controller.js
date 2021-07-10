const mongoose = require("mongoose");
const User = require("../models/user.model");
const mailer = require("../config/mailer.config");
const teams = require("../data/teams.json");
const offices = require("../data/offices.json");

module.exports.register = (req, res, next) => {
  res.render("auth/register", {
    teams,
    offices,
  });
};

module.exports.doRegister = (req, res, next) => {
  console.log(req.body)
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
        user = { name, lastName, email, phone, team, office, role } =
          req.body;

        const password = Math.random().toString(36).slice(-8);
        user.password = password;

        return User.create(user)
          .then((user) => {
            mailer.sendWelcomeEmail(user, password);
            res.redirect("/");
          });
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        renderWithErrors(error.errors);
      } else {
        next(error);
      }
    });
};

module.exports.login = (req, res, next) => {
  res.render("auth/login");
};

module.exports.doLogin = (req, res, next) => {
  function renderWithLoginError() {
    res.render("auth/login", {
      user: req.body,
      errors: {
        email: "Invalid user or password",
      },
    });
  }

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        renderWithLoginError();
      } else {
        return user.checkPassword(req.body.password).then((match) => {
          if (!match) {
            renderWithLoginError();
          } else {
            console.log('tutto benne')
            req.session.userId = user.id;
            res.redirect("/timeline");
          }
        });
      }
    })
    .catch((error) => next(error));
};

module.exports.logout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/login');
};
