//core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../../utils/pathUtil");

// Local Module
const Home = require("../models/Home");
const NewFavourite = require("../models/NewFavourite");

exports.getFavourites = (req, res, next) => {
  // Logic to get user's favourites
  NewFavourite.getFavourites().then((favHomes) => {
    Home.getAllHomes()
      .then((allHomes) => {
        const favouriteHomes = allHomes.filter((home) =>
          favHomes.some((fav) => fav.homeId === String(home._id)),
        );
        res.render("store/favourite-list", {
          title: "Your Favourites",
          homes: favouriteHomes,
        });
      })
      .catch((err) => {
        console.error("Error fetching homes", err);
        res.status(500).send("Internal Server Error");
      });
  });
};

exports.addFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  const favourite = new NewFavourite(homeId);
  favourite.addFavourite().then(() => {
    res.render("store/favourite-added", { title: "Favourite Added" });
  });
};

exports.deleteFavouriteHome = (req, res, next) => {
  const homeId = req.params.id;
  NewFavourite.deleteById(homeId).then(() => {
    res.redirect("/favourites");
  });
};
