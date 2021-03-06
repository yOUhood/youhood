const express = require("express");
const auth = require("../controllers/auth.controller");
const users = require("../controllers/users.controller");
const timeline = require("../controllers/timeline.controller");
const secure = require("../middlewares/secure.mid");
const upload = require("../config/multer.config");
const router = express.Router();

router.get("/users/list", secure.isAuthenticated, users.listUsers);
router.get("/register", secure.isAuthenticated, secure.administrator, auth.register);
router.post("/register", secure.isAuthenticated, secure.administrator, auth.doRegister);

router.get("/login", secure.isNotAuthenticated, auth.login);
router.post("/login", secure.isNotAuthenticated, auth.doLogin);
router.get("/logout", secure.isAuthenticated, auth.logout);

router.get("/timeline", secure.isAuthenticated, timeline.list);
router.post("/timeline", secure.isAuthenticated, upload.single('photokudo'), timeline.doCreateKudo);

 router.get("/", (req, res) => {
   console.log('lalala')
   res.redirect("/timeline");
 });

module.exports = router;
