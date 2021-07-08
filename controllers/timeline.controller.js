const mongoose = require("mongoose");
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
        .sort({ createdAt: 'desc' })
        .then(kudos => {
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
 console.log(req.body)
  
  const kudo = new Kudo({
    eskudo: req.body.eskudo,
    message: req.body.message,
    recipient: req.body.recipientId ? req.body.recipientId : null,
    sender: req.user.id
  });

  if (req.file) {
    kudo.photokudo = req.file.path;
  };

  kudo.save()
    .then((kudoCreated) =>{
      console.log(kudoCreated)
       res.redirect("/timeline")
      })
    .catch((error) => {
      console.log(error.errors)
      if (error instanceof mongoose.Error.ValidationError) {
        
        User.find({ team: req.user.team })
        .then((teamMates) => {
          Kudo.find()
            .populate('sender')
            .populate('recipient')
            .sort({ createdAt: 'desc' })
            .then(kudos => {
              console.log('errores', error.errors)
              res.render("timeline", {
                eskudos,
                teamMates,
                kudos,
                errors: error.errors
              });
            })
        })
      } else {
        next(error);
      }
    })
};
