// External Module
const express = require("express");
const hostRouter = express.Router();
const hostController = require("../app/controllers/HostController");

hostRouter.get("/add-home", hostController.getAddHome);
hostRouter.get("/edit-home/:id", hostController.getEditHome);
hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.post("/update-home", hostController.postUpdateHome);
hostRouter.get("/home-list", hostController.getHomeList);
hostRouter.post("/delete-home/:id", hostController.postDeleteHome);
exports.hostRoutes = hostRouter;
