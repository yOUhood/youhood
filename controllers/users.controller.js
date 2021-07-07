const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
  res.render("users/list");
};

module.exports.listUsers = (req, res, next) => {
  const { name, lastName } = req.query
  const criteria = {}
  if (name) {
    criteria.name = new RegExp(`^${name}`, 'i')
  }

  if (lastName) {
    criteria.lastName = new RegExp(`^${lastName}`, 'i')
  }
  

  User.find(criteria)
    .limit(5)
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};
