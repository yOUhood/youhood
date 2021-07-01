const mongoose = require('mongoose');

module.exports.list = (req, res, next) => {
    res.render("users/list")
}