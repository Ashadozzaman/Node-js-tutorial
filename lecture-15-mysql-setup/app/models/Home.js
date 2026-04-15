//core module
const db = require("../../utils/database");

module.exports = class Home {
  constructor(name, address, price, image, id) {
    this.name = name;
    this.address = address;
    this.price = price;
    this.image = image;
    this.id = id;
  }

  save() {
    return db.execute(
      "INSERT INTO homes (name, address, price, image) VALUES (?, ?, ?, ?)",
      [this.name, this.address, this.price, this.image],
    );
  }
  static update(id = null, updatedHome = null) {
    if (!id || !updatedHome) {
      return Promise.reject(new Error("Invalid input for update"));
    }
    return db.execute(
      "UPDATE homes SET name = ?, address = ?, price = ?, image = ? WHERE id = ?",
      [
        updatedHome.name,
        updatedHome.address,
        updatedHome.price,
        updatedHome.image,
        id,
      ],
    );
  }

  static delete(id) {
    return db.execute("DELETE FROM homes WHERE id = ?", [id]);
  }

  static getAllHomes() {
    return db.execute("SELECT * FROM homes");
  }

  static getHomeById(id) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [id]);
  }
};
