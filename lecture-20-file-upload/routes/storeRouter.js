// External Module
const express = require("express");
const storeRouter = express.Router();
const storeController = require("../app/controllers/StoreController");
const favouriteController = require("../app/controllers/FavourateController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/home", storeController.getHome);
storeRouter.get("/booking", storeController.getBooking);
// storeRouter.get("/favourites", storeController.getFavourites);
// storeRouter.post("/favourites", storeController.addFavourite);

storeRouter.get("/favourites", favouriteController.getFavourites);
storeRouter.post("/favourites", favouriteController.addFavourite);
storeRouter.post(
  "/favourites/:id/delete",
  favouriteController.deleteFavouriteHome,
);

storeRouter.get("/home/:id", storeController.getHomeDetails);
storeRouter.put("/home/:id", storeController.updateHome);

module.exports = storeRouter;
