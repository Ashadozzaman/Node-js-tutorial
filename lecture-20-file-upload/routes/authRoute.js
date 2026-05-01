const express = require("express");
const authRouter = express.Router();
const authController = require("../app/controllers/AuthController.js");

authRouter.get("/signup", authController.getSignup);
authRouter.post("/signup", authController.postSignup);
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
