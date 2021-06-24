const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");


/** View engine setup */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
require('./config/hbs.config');

/** Router setup */
const routes = require("./config/routes.config");
app.use('/', routes);

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`Ready! Listening on port ${port}`);
});
