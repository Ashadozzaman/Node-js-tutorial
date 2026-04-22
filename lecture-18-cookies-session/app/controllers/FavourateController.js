const mongoose = require("mongoose");
// Local Module
const Home = require("../models/Home");
const NewFavourite = require("../models/NewFavourite");

exports.getFavourites = async (req, res, next) => {
  try {
    const favHomes = await NewFavourite.find().populate("homeId");

    const favouriteHomes = favHomes.map((fav) => fav.homeId);

    res.render("store/favourite-list", {
      title: "Your Favourites",
      homes: favouriteHomes,
      isLoggedIn: req.isLoggedIn,
    });
  } catch (err) {
    console.error("Error fetching favourites", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  const favourite = new NewFavourite({ homeId: homeId });
  favourite.save().then(() => {
    res.render("store/favourite-added", {
      title: "Favourite Added",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.deleteFavouriteHome = (req, res, next) => {
  const homeId = req.params.id;
  NewFavourite.findOneAndDelete({ homeId: homeId }).then(() => {
    res.redirect("/favourites");
  });
};
