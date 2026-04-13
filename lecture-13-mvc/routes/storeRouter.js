// External Module
const express = require("express");
const storeRouter = express.Router();
const storeController = require("../app/controllers/StoreController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/home", storeController.getHome);
storeRouter.get("/booking", storeController.getBooking);
storeRouter.get("/favourites", storeController.getFavourites);

module.exports = storeRouter;
