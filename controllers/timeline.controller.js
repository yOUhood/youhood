const mongoose = require("mongoose");
const Kudos = require("../models/kudo.model");
const Kudo = require("../models/kudo.model");
const eskudos = Object.keys(require("../data/eskudos.json"));
const User = require("../models/user.model");
const users = Object.keys(require("../data/users.json"))

module.exports.list = (req, res, next) => {
  User.find({ team: req.user.team })
    .then((teamMates) => {
      Kudo.find()
      .populate('sender')
      .populate('recipient')
      .sort({createdAt: 'desc'})
        .then(kudos => {
          console.log('KUDOS ENCONTRADOS', kudos)
          res.render("timeline", {
            eskudos,
            teamMates,
            kudos
          });
        })
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

  if (req.file) {
    photokudo = req.file.path;
  };

  kudo.save().then(() => res.redirect("/timeline"));

};
