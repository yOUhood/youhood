const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
const teams = require("../data/teams.json");
const offices = require("../data/offices.json");

const EMAIL_PATTERN =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const PASSWORD_PATTERN = /^.{7,}$/i;
const SALT_ROUNDS = 10;

const userSchema = new Schema(
  {
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
    },
    position: {
      type: String,
    },
    team: {
      type: String,
      required: "Select a team",
      enum: teams,
    },
    office: {
      type: String,
      required: "Select an office",
      enum: offices,
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
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt
      .hash(user.password, SALT_ROUNDS)
      .then((hash) => {
        user.password = hash;
        next();
      })
      .catch((error) => next(error));
  } else {
    next();
  }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
