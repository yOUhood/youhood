const express = require("express");
const auth = require("../controllers/auth.controller");
const secure = require("../middlewares/secure.mid");
const router = express.Router();

router.get(
  "/register",
  secure.isAuthenticated,
  secure.administrator,
  auth.register
);
router.post(
  "/register",
  secure.isAuthenticated,
  secure.administrator,
  auth.doRegister
);

router.get("/login", secure.isNotAuthenticated, auth.login);
router.post("/login", secure.isNotAuthenticated, auth.doLogin);
router.get("/logout", secure.isAuthenticated, auth.logout);

module.exports = router;
