// core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../../utils/pathUtil");

// Local Module
const Home = require("../models/Home");

module.exports = class Favourites {
  constructor(name, address, price, image, id) {
    this.name = name;
    this.address = address;
    this.price = price;
    this.image = image;
    this.id = id;
  }

  save() {
    Favourites.getFavourites((homes) => {
      // Check if the home is already in favourites
      if (homes.some((h) => h.id === this.id)) {
        console.log("Home is already in favourites");
        return;
      }
      homes.push(this);
      const filePath = path.join(rootDir, "public/data", "favourites.json");
      fs.writeFile(filePath, JSON.stringify(homes), (err) => {
        if (err) {
          console.error("Error writing to file", err);
        } else {
          console.log("Favourite added successfully");
        }
      });
    });
  }

  static getFavourites(callback) {
    const favouritesFilePath = path.join(
      rootDir,
      "public/data",
      "favourites.json",
    );
    fs.readFile(favouritesFilePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
};
