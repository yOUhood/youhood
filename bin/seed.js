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
        console.log('entro')
        users.forEach((user) => {
            const newUser = {
                role: user.role,
                email: user.email ? user.email : faker.internet.email(),
                name: faker.name.firstName(),
                lastName: faker.name.lastName(),
                password: faker.internet.password(),
                startDate: faker.date.past(),
                office: user.office,
                team: user.team,
                phone: faker.phone.phoneNumber()
            }
            new User(newUser)
            .save()
        })
    })
    .catch((error) => console.log(error))
    // .then(() => process.exit(0));
});