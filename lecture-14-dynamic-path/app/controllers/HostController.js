const Home = require("../models/Home");
const NewFavourite = require("../models/NewFavourite");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-edit-home", { title: "Add Home", isEditing: false });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.id;
  const isEditing = req.query.editing === "true";
  console.log(isEditing, homeId);
  if (!isEditing) {
    return res.redirect("/home-list");
  }
  Home.getHomeById(homeId, (home) => {
    res.render("host/add-edit-home", {
      title: "Edit Home",
      home: home,
      isEditing: isEditing,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { home_name, location, price_per_night, image_url } = req.body;
  const home = new Home(home_name, location, price_per_night, image_url);
  home.save();

  res.render("host/home-added", { title: "Home Added" });
};
exports.postUpdateHome = (req, res, next) => {
  const { home_name, location, price_per_night, image_url, home_id } = req.body;

  const updatedHome = new Home(home_name, location, price_per_night, image_url);

  Home.update(home_id, updatedHome, () => {
    res.redirect("/host/home-list");
  });
};

exports.postDeleteHome = (req, res, next) => {
  const { home_id } = req.body;

  Home.delete(home_id, () => {
    NewFavourite.deleteById(home_id, () => {
      res.redirect("/host/home-list");
    });
  });
};

exports.getHomeList = (req, res, next) => {
  Home.getAllHomes((homes) => {
    res.render("host/host-home-list", {
      homes: homes,
      title: "Hosts Home List",
    });
  });
};
