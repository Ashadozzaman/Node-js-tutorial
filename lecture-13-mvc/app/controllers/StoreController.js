const Home = require("../models/Home");

exports.getIndex = (req, res, next) => {
  Home.getAllHomes((homes) => {
    res.render("store/index", { homes: homes, title: "Home Page" });
  });
};
exports.getHome = (req, res, next) => {
  Home.getAllHomes((homes) => {
    res.render("store/home-list", { homes: homes, title: "Home Page" });
  });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", { title: "Booking Page" });
};

exports.getFavourites = (req, res, next) => {
  res.render("store/favourite-list", { title: "Favourites Page" });
};
