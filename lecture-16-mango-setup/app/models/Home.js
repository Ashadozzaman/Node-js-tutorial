const { ObjectId } = require("mongodb");
const { getDB } = require("../../utils/mongodb");

module.exports = class Home {
  constructor(name, address, price, image, _id) {
    this.name = name;
    this.address = address;
    this.price = price;
    this.image = image;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    return getDB().collection("homes").insertOne(this);
  }
  static update(id = null, updatedHome = null) {
    const db = getDB();
    return db
      .collection("homes")
      .updateOne({ _id: new ObjectId(String(id)) }, { $set: updatedHome });
  }

  static delete(id) {
    const db = getDB();
    return db.collection("homes").deleteOne({ _id: new ObjectId(String(id)) });
  }

  static getAllHomes() {
    const db = getDB();
    return db.collection("homes").find().toArray();
  }

  static getHomeById(id) {
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(id)) })
      .next();
  }
};
