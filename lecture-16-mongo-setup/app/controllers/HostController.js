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
  Home.getHomeById(homeId).then((home) => {
    console.log(home);
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
  console.log(home);
  home
    .save()
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postUpdateHome = (req, res, next) => {
  const { home_name, location, price_per_night, image_url, home_id } = req.body;

  const home = new Home(home_name, location, price_per_night, image_url);

  Home.update(home_id, home)
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const { home_id } = req.body;

  Home.delete(home_id).then(() => {
    NewFavourite.deleteById(home_id).then(() => {
      console.log("Deleted home and associated favourites");
    });
    res.redirect("/host/home-list");
  });
};

exports.getHomeList = (req, res, next) => {
  Home.getAllHomes().then((homes) => {
    res.render("host/host-home-list", {
      homes: homes,
      title: "Hosts Home List",
    });
  });
};
