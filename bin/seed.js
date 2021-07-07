require("dotenv").config();

const faker = require("faker");
const mongoose = require("mongoose");
const users = require("../data/users.json");
const Kudo = require("../models/kudo.model");
const User = require("../models/user.model");

require("../config/db.config");

mongoose.connection.once("open", () => {
  console.info(
    `***Connected to the database ${mongoose.connection.db.youhood}***`
  );

  mongoose.connection.db
    .dropDatabase()
    .then(() => console.log(`-Database dropped`))
    .then(() => {
      return Promise.all(
        users.map((user) => {
          const newUser = {
            role: user.role,
            email: user.email ? user.email : faker.internet.email(),
            name: user.name ? user.name : faker.name.firstName(),
            lastName: faker.name.lastName(),
            password: user.password ? user.password : faker.internet.password(),
            startDate: faker.date.past(),
            office: user.office,
            team: user.team,
            phone: faker.phone.phoneNumber(),
            photo: faker.image.avatar(),
          };
          return new User(newUser).save();
        })
      );
    })
    .then((results) => {
      return Promise.all(
        results.map((user, index, users) => {
          const newKudo = {
              eskudo: "thankyou",
              message: "Lorem ipsum dolor y ya está",
              recipient: index < users.length - 1 ? users[index + 1]._id : users[0]._id,
              sender: user._id
          }

          return new Kudo(newKudo).save().then(result => {
            console.log(result)
          })
          
        })
      )

  })
  .then(() => {
    process.exit(0)
  })
    .catch((error) => console.log(error));
});
