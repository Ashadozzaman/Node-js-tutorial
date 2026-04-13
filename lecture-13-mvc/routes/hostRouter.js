// External Module
const express = require("express");
const hostRouter = express.Router();
const hostController = require("../app/controllers/HostController");

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/home-list", hostController.getHomeList);
exports.hostRoutes = hostRouter;
