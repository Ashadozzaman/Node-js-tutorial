const mongoose = require("mongoose");
// Local Module
const Home = require("../models/Home");
const User = require("../models/User");

exports.getFavourites = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("favourites");
    console.log(user);
    res.render("store/favourite-list", {
      title: "Your Favourites",
      homes: user.favourites,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.error("Error fetching favourites", err);
    res.status(500).send("Internal Server Error");
  }
};

exports.addFavourite = async (req, res, next) => {
  const homeId = req.body.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  return res.redirect("/favourites");
};

exports.deleteFavouriteHome = async (req, res, next) => {
  const homeId = req.params.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  console.log(user, homeId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(
      (fav) => fav.toString() !== homeId,
    );
    await user.save();
  }
  res.redirect("/favourites");
};
