const mongoose = require("mongoose");
const Kudos = require("../models/kudos.model");
const Kudo = require("../models/kudos.model");
const eskudos = Object.keys(require("../data/eskudos.json"));
const User = require("../models/user.model");
const users = Object.keys(require("../data/users.json"))

module.exports.list = (req, res, next) => {
  User.find({ team: req.user.team })
    .then((teamMates) => {
      res.render("timeline", {
        eskudos,
        teamMates,
      });
    })
    .catch((err) => next(error));
};

module.exports.doCreateKudo = (req, res, next) => {

  let userKudos = req.body.eskudos;
  if (userKudos && !Array.isArray(userKudos)) {
    userKudos = [userKudos];
  }

  const kudo = new Kudo({
    eskudo: req.body.eskudo,
    message: req.body.message,
    recipient: req.body.recipient,
    sender: req.user.id,
    photo: req.user.photo
  });

  kudo.save().then(() => res.redirect("/timeline"));
};
