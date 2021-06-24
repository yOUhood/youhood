const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    type: Number,
    match: [PHONE_PATTERN, "phone number is not valid"],
  },
  position: {
    type: String,
  },
  team: {
    type: String,
    required: "select a team",
  },
  office: {
    type: String,
    required: "select location",
  },
  admin: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: Date,
  },
  photo: {
    type: String,
  },
});
