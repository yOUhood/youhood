const express = require("express");
const auth = require("../controllers/auth.controller");
const users = require("../controllers/users.controller");
const timeline = require("../controllers/timeline.controller");
const secure = require("../middlewares/secure.mid");
const router = express.Router();

router.get("/users", secure.isAuthenticated, users.list);
router.get("/register", secure.isAuthenticated, secure.administrator, auth.register);
router.post("/register", secure.isAuthenticated, secure.administrator, auth.doRegister);

router.get("/login", secure.isNotAuthenticated, auth.login);
router.post("/login", secure.isNotAuthenticated, auth.doLogin);
router.get("/logout", secure.isAuthenticated, auth.logout);

router.get("/newsfeed", timeline.list)

module.exports = router;
