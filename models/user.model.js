const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const teams = require("../data/teams.json");
const offices = require("../data/offices.json");

EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
PASSWORD_PATTERN = /^.{7,}$/i;
PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

const userSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
  },
  lastName: {
    type: String,
    required: "last name is required",
  },
  email: {
    type: String,
    required: "email is required",
    match: [EMAIL_PATTERN, "email is not valid"],
    unique: true,
  },
  password: {
    type: String,
    required: "password is required",
    match: [PASSWORD_PATTERN, "password needs at least 7 characters"],
  },
  phone: {
    type: String,
    required: "phone is required",
    match: [PHONE_PATTERN, "phone number is not valid"],
  },
  position: {
    type: String,
  },
  team: {
    type: [
      {
        type: String,
/*         required: "select a team",
 */        enum: teams,
      },
    ],
    default: [],
  },
  office: {
    type: [
      {
        type: String,
/*         required: "select an office",
 */        enum: offices,
      },
    ],
    default: [],
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  startDate: {
    type: Date,
  },
  photo: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
