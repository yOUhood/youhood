const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const teams = require('../data/teams.json');
const offices = require('../data/offices.json');
const password = Math.random().toString(36).slice(-8);


const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{7,}$/i;
const PHONE_PATTERN = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const SALT_ROUNDS = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: "Name is required",
  },
  lastName: {
    type: String,
    required: "Last name is required",
  },
  email: {
    type: String,
    required: "Email is required",
    match: [EMAIL_PATTERN, "email is not valid"],
    unique: true,
  },
  password: {
    type: String,
    required: "Password is required",
    match: [PASSWORD_PATTERN, "password needs at least 7 characters"],
  },
  phone: {
    type: String,
    required: "Phone is required",
    match: [PHONE_PATTERN, "Phone number is not valid"],
  },
  position: {
    type: String,
  },
  team: {
    type: [
      {
        type: String,
        required: "Select a team",
        enum: teams,
      },
    ],
    default: [],
  },
  office: {
    type: [
      {
        type: String,
        required: "Select an office",
        enum: offices,
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
},{timestamps:true});

userSchema.pre('save', function(next) {
  const user = this;
if(user.isModified('password')) {
bcrypt.hash(user.password, SALT_ROUNDS)
.then(hash => {
  user.password = hash;
  next();
})
.catch(error => next(error))
} else {
next();
}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
