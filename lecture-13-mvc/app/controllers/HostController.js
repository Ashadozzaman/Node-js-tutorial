const Home = require("../models/Home");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", { title: "Add Home" });
};

exports.postAddHome = (req, res, next) => {
  const { home_name, location, price_per_night, image_url } = req.body;
  const home = new Home(home_name, location, price_per_night, image_url);
  home.save();

  res.render("host/home-added", { title: "Home Added" });
};

exports.getHomeList = (req, res, next) => {
  Home.getAllHomes((homes) => {
    res.render("host/host-home-list", {
      homes: homes,
      title: "Hosts Home List",
    });
  });
};
