const { getDB } = require("../../utils/mongodb");
const Home = require("./Home");

module.exports = class NewFavourite {
  constructor(homeId) {
    this.homeId = homeId;
  }
  addFavourite() {
    const db = getDB();
    return db
      .collection("favourites")
      .findOne({ homeId: this.homeId })
      .then((existingFav) => {
        if (existingFav) {
          return Promise.resolve(); // Already exists, do nothing
        }
        return db.collection("favourites").insertOne(this);
      });
  }

  static getFavourites() {
    const db = getDB();
    return db.collection("favourites").find().toArray();
  }

  static deleteById(id) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ homeId: id });
  }
};
