//core module
const fs = require("fs");
const path = require("path");
const rootDir = require("../../utils/pathUtil");

module.exports = class Home {
  constructor(name, address, price, image) {
    this.name = name;
    this.address = address;
    this.price = price;
    this.image = image;
  }

  save() {
    Home.getAllHomes((homes) => {
      homes.push(this);
      const filePath = path.join(rootDir, "public/data", "homes.json");
      fs.writeFile(filePath, JSON.stringify(homes), (err) => {
        if (err) {
          console.error("Error writing to file", err);
        } else {
          console.log("Home saved successfully");
        }
      });
    });
  }

  static getAllHomes(callback) {
    const filePath = path.join(rootDir, "public/data", "homes.json");
    fs.readFile(filePath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
    // const data = await fs.promises.readFile(filePath);
    // const homes = JSON.parse(data);
    // callback(homes);
  }
};
