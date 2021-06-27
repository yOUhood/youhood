require('dotenv').config();

const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const logger = require("morgan")

/** View engine setup */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
require("./config/hbs.config");

/** Middlewares */
app.use(express.urlencoded({extended:false}));
app.use(express.static(`${__dirname}/public`))

app.use(logger('dev'))

/** Router setup */
const routes = require("./config/routes.config");
app.use("/", routes);

/** Configurations */
require("./config/db.config");

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Ready! Listening on port ${port}`);
});
