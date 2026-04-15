// core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../../utils/pathUtil");

// Local Module
const favouritesFilePath = path.join(
  rootDir,
  "public/data",
  "favourites_homes.json",
);

module.exports = class NewFavourite {
  static addFavourite(homeId, callback) {
    NewFavourite.getFavourites((fav) => {
      if (!fav.includes(homeId)) {
        fav.push(homeId);
        fs.writeFile(favouritesFilePath, JSON.stringify(fav), (err) => {
          callback(err);
        });
      } else {
        callback(new Error("Home already in favourites"));
      }
    });
  }

  static getFavourites(callback) {
    const favouritesFilePath = path.join(
      rootDir,
      "public/data",
      "favourites_homes.json",
    );
    fs.readFile(favouritesFilePath, (err, data) => {
      if (err) {
        return callback([]); // file not found বা read error
      }
      try {
        const parsedData = data.length ? JSON.parse(data) : [];
        callback(parsedData);
      } catch (error) {
        console.error("JSON parse error:", error);
        callback([]);
      }
    });
  }

  static deleteById(id, callback) {
    NewFavourite.getFavourites((homes) => {
      const updatedHomes = homes.filter((h) => String(h) !== String(id));

      const filePath = path.join(
        rootDir,
        "public/data",
        "favourites_homes.json",
      );

      fs.writeFile(filePath, JSON.stringify(updatedHomes), (err) => {
        if (err) {
          console.error("Error writing to file", err);
          return callback(err);
        }

        console.log("Favourite deleted successfully");
        callback(null);
      });
    });
  }
};
