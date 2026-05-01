//core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../../utils/pathUtil");

// Local Module
const Home = require("../models/Home");

exports.getIndex = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/home-list", {
        homes: homes,
        title: "Home Page",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getHome = (req, res, next) => {
  Home.find()
    .then((homes) => {
      res.render("store/home-list", {
        homes: homes,
        title: "Home Page",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getBooking = (req, res, next) => {
  res.render("store/booking", {
    title: "Booking Page",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.id;
  Home.findById(homeId).then((home) => {
    const homeDetails = home;
    if (home) {
      res.render("store/home-details", {
        home: homeDetails,
        title: "Home Details",
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    } else {
      res
        .status(404)
        .render("404", {
          title: "Home Not Found",
          isLoggedIn: req.isLoggedIn,
          user: req.session.user,
        });
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
