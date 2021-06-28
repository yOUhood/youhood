const express = require("express");
const auth = require("../controllers/auth.controller");
const router = express.Router();

router.get("/register", auth.register);
router.post("/register", auth.doRegister);

router.get("/", auth.login);
router.post("/", auth.doLogin);

module.exports = router;
