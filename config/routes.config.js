const express = require("express");
const auth = require("../controllers/auth.controller");
const router = express.Router();

router.get("/register", auth.register);
router.post("/register", auth.doRegister);

router.get("/login", auth.login);
router.post("/login", auth.doLogin);
router.get("/logout", auth.logout)

module.exports = router;
