const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.list = (req, res, next) => {
  res.render("users/list");
};

module.exports.listUsers = (req, res, next) => {
  const { name } = req.query
  const criteria = {}
  criteria.name = new RegExp(`^${name}`, 'i')
  
  User.find(criteria)
    .then((users) => {
      res.json(users);
    })
    .catch(next);
};
