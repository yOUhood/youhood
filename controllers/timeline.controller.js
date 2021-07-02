const mongoose = require('mongoose');
const Kudos = require('../models/kudos.model')

module.exports.list = (req, res, next) => {
    res.render("timeline")
}

module.exports.doCreate = (req, res, next) => {
}