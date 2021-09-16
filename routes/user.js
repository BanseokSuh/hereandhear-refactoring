var express = require("express");
var router = express.Router();

const { userController } = require("../controllers");
const { authenticateToken } = require("../middlewares/auth");

// 미들웨어
router.post("/signin", userController.signin.post);
router.post("/signup", userController.signup.post);
router.post("/signout", authenticateToken, userController.signout.post);
router.post("/update", authenticateToken, userController.update.post);
router.get("/userInfo", authenticateToken, userController.userinfo.get);
router.post("/token", userController.token.post);
router.post("/getNewPassword", userController.getNewPassword.post);

module.exports = router;
