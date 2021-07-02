const mongoose = require("mongoose");
const Kudo = require("../models/kudos.model");
const eskudos = Object.keys(require("../data/eskudos.json"));

module.exports.list = (req, res, next) => {
  res.render("timeline");
};

module.exports.createKudo = (req, res, next) => {
  res.render("timeline", {
    eskudos,
  });
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
  });

  kudo.save().then(() => res.redirect("/"));
};
