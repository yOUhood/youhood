require ('dotenv').config();

const faker = require('faker');
const mongoose = require("mongoose");
const users = require('../data/users.json');
const User = require('../models/user.model');

require("../config/db.config");

mongoose.connection.once('open', () => {
    console.info(`***Connected to the database ${mongoose.connection.db.youhood}***`);

    mongoose.connection.db
    .dropDatabase()
    .then(()=> console.log(`-Database dropped`))
    .then(() => {
        return Promise.all(users.map((user) => {
            const newUser = {
                role: user.role,
                email: user.email ? user.email : faker.internet.email(),
                name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                password: user.password ? user.password : faker.internet.password(),
                startDate: faker.date.past(),
                office: user.office,
                team: user.team,
                phone: faker.phone.phoneNumber()
            }
            return new User(newUser)
            .save()
        }))
    })
    .then(() => process.exit(0))
    .catch((error) => console.log(error))
});