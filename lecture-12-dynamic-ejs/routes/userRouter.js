//core module
const path = require("path");
// External Module
const express = require("express");
const userRouter = express.Router();
const { homes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log(homes);
  res.render("home", { homes: homes, title: "Home Page" });
});

module.exports = userRouter;
