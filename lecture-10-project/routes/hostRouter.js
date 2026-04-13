//core module
const path = require("path");
// External Module
const express = require("express");
const hostRouter = express.Router();
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "/views/add-home.html"));
});
hostRouter.post("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootDir, "/views/homeAdded.html"));
});

module.exports = hostRouter;
