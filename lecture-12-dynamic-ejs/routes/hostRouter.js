//core module
const path = require("path");
// External Module
const express = require("express");
const hostRouter = express.Router();
const rootDir = require("../utils/pathUtil");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("add-home", { title: "Add Home" });
});

const homes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  homes.push({
    name: req.body.home_name,
    address: req.body.location,
    price: req.body.price_per_night,
    image: req.body.image_url,
  }); // console.log(req.body);
  res.render("homeAdded", { title: "Home Added" });
});

exports.hostRoutes = hostRouter;
exports.homes = homes;
