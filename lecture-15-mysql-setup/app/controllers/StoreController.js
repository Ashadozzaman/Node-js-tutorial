//core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../../utils/pathUtil");

// Local Module
const Home = require("../models/Home");
const Favourites = require("../models/Favourites");

exports.getIndex = (req, res, next) => {
  Home.getAllHomes()
    .then(([homes, fields]) => {
      res.render("store/home-list", { homes: homes, title: "Home Page" });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getHome = (req, res, next) => {
  Home.getAllHomes()
    .then(([homes, fields]) => {
      res.render("store/home-list", { homes: homes, title: "Home Page" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", { title: "Booking Page" });
};

exports.getFavourites = (req, res, next) => {
  // Logic to get user's favourites
  Favourites.getFavourites((homes) => {
    res.render("store/favourite-list", {
      homes: homes,
      title: "Favourites Page",
    });
  });
};

exports.addFavourite = (req, res, next) => {
  const homeId = req.body.homeId;
  const home = Home.getHomeById(homeId, (home) => {
    if (home) {
      const favourite = new Favourites(
        home.name,
        home.address,
        home.price,
        home.image,
        home.id,
      );
      favourite.save();
      res.render("store/favourite-added", { title: "Favourite Added" });
    } else {
      res.status(404).render("404", { title: "Home Not Found" });
    }
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.id;
  Home.getHomeById(homeId).then(([home]) => {
    const homeDetails = home[0];
    if (home) {
      res.render("store/home-details", {
        home: homeDetails,
        title: "Home Details",
      });
    } else {
      res.status(404).render("404", { title: "Home Not Found" });
    }
  });
};

exports.updateHome = (req, res, next) => {
  const homeId = req.params.id;
  const updatedData = req.body;
  Home.updateHome(homeId, updatedData, (updatedHome) => {
    if (updatedHome) {
      res.json({ message: "Home updated successfully", home: updatedHome });
    } else {
      res.status(404).json({ message: "Home not found" });
    }
  });
};
