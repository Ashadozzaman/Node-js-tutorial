const Home = require("../models/Home");
const NewFavourite = require("../models/NewFavourite");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-edit-home", {
    title: "Add Home",
    isEditing: false,
    isLoggedIn: req.isLoggedIn,
  });
};
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.id;
  const isEditing = req.query.editing === "true";
  console.log(isEditing, homeId);
  if (!isEditing) {
    return res.redirect("/home-list");
  }
  Home.findById(homeId).then((home) => {
    console.log(home);
    res.render("host/add-edit-home", {
      title: "Edit Home",
      home: home,
      isEditing: isEditing,
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { home_name, location, price_per_night, image_url } = req.body;
  const home = new Home({
    name: home_name,
    address: location,
    price: price_per_night,
    image: image_url,
  });
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

  Home.findById(home_id)
    .then((home) => {
      if (!home) {
        return res.status(404).json({ message: "Home not found" });
      }
      home.name = home_name;
      home.address = location;
      home.price = price_per_night;
      home.image = image_url;

      return home.save();
    })
    .then((updatedHome) => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error updating home" });
    });
};

exports.postDeleteHome = (req, res, next) => {
  const { home_id } = req.body;

  Home.findOneAndDelete({ _id: home_id })
    .then(() => {
      res.redirect("/host/home-list");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error deleting home" });
    });
};

exports.getHomeList = (req, res, next) => {
  Home.find().then((homes) => {
    res.render("host/host-home-list", {
      homes: homes,
      title: "Hosts Home List",
      isLoggedIn: req.isLoggedIn,
    });
  });
};
