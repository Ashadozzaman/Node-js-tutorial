//core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../../utils/pathUtil");

// Local Module
const Home = require("../models/Home");
const NewFavourite = require("../models/NewFavourite");

exports.getFavourites = (req, res, next) => {
  // Logic to get user's favourites
  NewFavourite.getFavourites((homes) => {
    Home.getAllHomes((allHomes) => {
      const favouriteHomes = allHomes.filter((home) => homes.includes(home.id));
      res.render("store/favourite-list", {
        homes: favouriteHomes,
        title: "Favourites Page",
      });
    });
  });
};

exports.addFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  NewFavourite.addFavourite(homeId, (err) => {
    if (err) {
      console.error("Error adding to favourites", err);
      res.redirect("/favourites");
    } else {
      res.redirect("/favourites");
    }
  });
};

exports.deleteFavouriteHome = (req, res, next) => {
  const homeId = req.params.id;
  NewFavourite.deleteById(homeId, (err) => {
    if (err) {
      console.error("Error deleting from favourites", err);
    }
    res.redirect("/favourites");
  });
};
